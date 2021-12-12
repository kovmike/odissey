import { useStore } from "effector-react";
import { $userFullData } from "../../features/goals/model";
import { NoGoal } from "../../components/noGoalNotification";
import { Chart } from "../../components/chart";
import { WeightTable } from "../../components/weight-table";
import { $youLooser } from "../../components/model";

export const HomePage: React.FC<{ user: any }> = ({ user }) => {
  const fullData = useStore($userFullData);
  const youLooser = useStore($youLooser);

  return (
    <div className="homepage">
      <span className="user">{user.email}</span>

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
