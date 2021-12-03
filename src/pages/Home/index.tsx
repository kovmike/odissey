import { useState } from "react";
import { useStore } from "effector-react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { GoalBuilder } from "../../components/goalBuilder";
import { $userGoal, testSet } from "../../features/goals/model";

export const HomePage: React.FC<{ user: any }> = ({ user }) => {
  const goal = useStore($userGoal);
  const [displayBasic, setDisplayBasic] = useState<boolean>(false);

  const prepareGoalData = (data: any) => {
    return data && data?.goal?.startWeight === 0 ? (
      <div>
        <span>Увас нет цели</span>
        <Button onClick={() => setDisplayBasic(true)}>создать цель</Button>
      </div>
    ) : (
      <span>sdfsdf</span>
    );
  };

  return (
    <div>
      <span>{user.email}</span>
      <hr />
      {prepareGoalData(goal)}
      <Button onClick={() => testSet()}>test</Button>

      <Dialog
        header="Задай цель"
        visible={displayBasic}
        style={{ width: "50vw" }}
        onHide={() => setDisplayBasic(false)}
      >
        <GoalBuilder />
      </Dialog>
    </div>
  );
};
