import { useStore } from "effector-react";
import { $userGoal } from "../../features/goals/model";
import { NoGoal } from "../../components/noGoalNotification";
import { $chartData } from "../../components/model";
import { Chart } from "../../components/chart";

export const HomePage: React.FC<{ user: any }> = ({ user }) => {
  const goal = useStore($userGoal);
  const chartData = useStore($chartData);

  return (
    <div>
      <span>{user.email}</span>
      <hr />
      {chartData && <Chart />}
      {goal?.startWeight === 0 && <NoGoal />}
    </div>
  );
};
