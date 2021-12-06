import { useStore } from "effector-react";
import { $userGoal } from "../../features/goals/model";
import { NoGoal } from "../../components/noGoalNotification";

export const HomePage: React.FC<{ user: any }> = ({ user }) => {
  const goal = useStore($userGoal);

  const prepareGoalData = (data: any) => {
    return data && data?.goal?.startWeight === 0 ? (
      <NoGoal />
    ) : (
      <span>goal</span>
    );
  };

  return (
    <div>
      <span>{user.email}</span>
      <hr />
      {prepareGoalData(goal)}
    </div>
  );
};
