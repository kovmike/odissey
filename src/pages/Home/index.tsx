import { useState } from "react";
import { useStore } from "effector-react";
import { User } from "firebase/auth";
import { Button, Select, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { $userFullData } from "../../features/goals/model";
import { NoGoal } from "../../components/no-goal";
import { Chart } from "../../components/chart";
import { WeightTable } from "../../components/weight-table";
import {
  $usersList,
  $youLooser,
  getReviewedUser,
} from "../../features/usersExp/model";
import { DBUser } from "../../components/types";
import { GithubFilled } from "@ant-design/icons";

export const HomePage: React.FC<{ user: User | null }> = ({ user }) => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<string | null | undefined>(
    null
  );
  const fullData = useStore($userFullData);
  const userList = useStore($usersList);
  const youLooser = useStore($youLooser);
  const { Option } = Select;

  const watch = () => {
    if (selectedUser) {
      getReviewedUser(selectedUser);
      navigate("/review");
    }
  };

  return (
    <div className="homepage">
      <header className="user">
        <span>{user?.email}</span>
        <div className="preview-block">
          <Select
            onChange={(e) => setSelectedUser(e as string)}
            style={{ width: 200 }}
            placeholder="Выбери кого-нибудь"
          >
            {(userList || []).map((user: DBUser) => (
              <Option value={user.user}>{user.username}</Option>
            ))}
          </Select>
          <Button disabled={!selectedUser} onClick={watch}>
            Просто посмотреть
          </Button>
        </div>
      </header>
      <div className="git">
        <Tooltip title="Поглядеть на говнокод">
          <a href="https://github.com/kovmike/odissey" target="_blanc">
            <GithubFilled />
          </a>
        </Tooltip>
      </div>

      {fullData?.startWeight === 0 ? (
        <NoGoal />
      ) : (
        <>
          {!youLooser ? (
            <span className="goal">
              {`Твоя цель: сбросить вес до ${
                fullData?.goalWeight
              }кг к ${new Date(fullData?.dateFinish!).toLocaleDateString(
                "ru"
              )}`}
            </span>
          ) : (
            <span>Ты не справился</span>
          )}
          <div className="charts">{fullData && <Chart user={fullData} />}</div>
          <div className="data-table">
            {fullData && <WeightTable user={fullData} review={false} />}
          </div>
        </>
      )}
    </div>
  );
};
