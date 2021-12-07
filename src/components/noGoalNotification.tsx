import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { GoalBuilder } from "./goalBuilder";

export const NoGoal: React.FC = () => {
  const [showGoalBuilder, setShowGoalBuilder] = useState<boolean>(false);
  return (
    <div>
      <span>
        У тебя нет цели(как у общества без цветовой дифференциации штанов)
      </span>
      <Button
        label="Создай цель"
        onClick={() => {
          setShowGoalBuilder(true);
        }}
      ></Button>
      <Dialog
        header="Задай цель"
        visible={showGoalBuilder}
        style={{ width: "50vw" }}
        onHide={() => setShowGoalBuilder(false)}
      >
        <GoalBuilder setCloseDialog={setShowGoalBuilder} />
      </Dialog>
    </div>
  );
};
