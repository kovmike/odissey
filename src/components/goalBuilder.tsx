import moment from "moment";
import { useStore } from "effector-react";
import "moment/locale/ru";
import locale from "antd/lib/date-picker/locale/ru_RU";
import {
  setStartTime,
  setFinishTime,
  setStartWeight,
  $startWeight,
  $goalWeight,
  setGoalWeight,
  setEmptyGoal,
} from "../features/usersExp/model";
import { Button, DatePicker, InputNumber, Space } from "antd";

interface GoalBuilderProps {
  setCloseDialog: (show: boolean) => void;
}

export const GoalBuilder: React.FC<GoalBuilderProps> = ({ setCloseDialog }) => {
  const startWeight = useStore($startWeight);
  const goalWeight = useStore($goalWeight);

  const setGoal = (e: any) => {
    e.preventDefault();
    setEmptyGoal();
    setCloseDialog(false);
  };

  return (
    <form className="goal-builder">
      <Space direction="vertical" size={"small"} align="center">
        <h3>Выбери период</h3>
        <DatePicker.RangePicker
          format={"DD MMMM yy"}
          locale={locale}
          onChange={(e) => {
            setStartTime(new Date(moment(e![0], true).format()));
            setFinishTime(new Date(moment(e![1], true).format()));
          }}
        />
        <h3>Начальный вес</h3>
        <InputNumber
          className="input-goalbuilder"
          value={startWeight}
          onChange={(value) => {
            if (!isNaN(value)) setStartWeight(value);
          }}
          step={0.25}
          min={0}
          max={200}
        />
        <h3>Целевой вес</h3>
        <InputNumber
          className="input-goalbuilder"
          value={goalWeight}
          step={0.25}
          min={0}
          max={startWeight}
          onChange={(value) => {
            if (!isNaN(value)) setGoalWeight(value);
          }}
        />
        <Button type="primary" onClick={setGoal}>
          Создать
        </Button>
      </Space>
    </form>
  );
};
