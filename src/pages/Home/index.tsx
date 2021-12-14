import { useStore } from "effector-react";
import { $userFullData } from "../../features/goals/model";
import { NoGoal } from "../../components/noGoalNotification";
import { Chart } from "../../components/chart";
import { WeightTable } from "../../components/weight-table";
import {
  $usersList,
  $youLooser,
  setReviewedUser,
} from "../../features/usersExp/model";
import { Button, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { User } from "../../components/types";

export const HomePage: React.FC<{ user: any }> = ({ user }) => {
  const navigate = useNavigate();
  const fullData = useStore($userFullData);
  const userList = useStore($usersList);
  const youLooser = useStore($youLooser);
  const { Option } = Select;

  const selectReviewedUser = (user: any) => {
    console.log(user);
    //TODO разобраться с select и типами юзеров
    if (user) setReviewedUser(user);
  };

  return (
    <div className="homepage">
      <header className="user">
        <span>{user.email}</span>
        <Select onChange={selectReviewedUser} style={{ width: 120 }}>
          {(userList || []).map((user: User) => (
            <Option value={user.user}>{user.username}</Option>
          ))}
        </Select>
        <Button onClick={() => navigate("/review")}>to review</Button>
      </header>

      {fullData?.startWeight === 0 ? (
        <NoGoal />
      ) : (
        <>
          {!youLooser ? (
            <span className="goal">{`Твоя цель: сбросить вес до ${
              fullData?.goalWeight
            }кг к ${new Date(fullData?.dateFinish!).toLocaleDateString(
              "ru"
            )}`}</span>
          ) : (
            <span>Ты не справился</span>
          )}
          <div className="charts">
            <Chart />
          </div>
          <div className="data-table">
            <WeightTable />
          </div>
        </>
      )}
    </div>
  );
};
