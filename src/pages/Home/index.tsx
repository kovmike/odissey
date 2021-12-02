import { useStore } from "effector-react";
import { Button } from "primereact/button";
import { $success, $userGoal } from "../../features/goals/model";

export const HomePage: React.FC<{ user: any }> = ({ user }) => {
  const goal = useStore($userGoal);

  const prepareGoalData = (data: any) => {
    console.log(data);
    return data && data?.goal?.startWeight === 0 ? (
      <span>Увас нет цели</span>
    ) : (
      <span>sdfsdf</span>
    );
  };

  return (
    <div>
      <span>{user}</span>
      {prepareGoalData(goal)}
    </div>
  );
};
