import { useStore } from "effector-react";
import { $userFullData } from "../../features/goals/model";
import { NoGoal } from "../../components/noGoalNotification";

import { Chart } from "../../components/chart";
import { WeightTable } from "../../components/weight-table";

export const HomePage: React.FC<{ user: any }> = ({ user }) => {
  const fullData = useStore($userFullData);

  return (
    <div>
      <span>{user.email}</span>
      <hr />

      {fullData?.startWeight === 0 ? (
        <NoGoal />
      ) : (
        <div>
          <span>{`Твоя цель: сбросить вес до ${fullData?.goalWeight}кг к ${fullData?.dateFinish}`}</span>
          <hr />
          <Chart />
          <WeightTable />
        </div>
      )}
    </div>
  );
};
