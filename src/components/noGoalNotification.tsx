import { Button, Modal } from "antd";
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
        type="primary"
        onClick={() => {
          setShowGoalBuilder(true);
        }}
      >
        Создай цель
      </Button>
      <Modal
        title="Задай цель"
        footer={null}
        visible={showGoalBuilder}
        style={{ width: "50vw" }}
        onCancel={() => setShowGoalBuilder(false)}
      >
        <GoalBuilder setCloseDialog={setShowGoalBuilder} />
      </Modal>
    </div>
  );
};
