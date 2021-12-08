import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { useStore } from "effector-react";
import {
  $dateFinish,
  $dateStart,
  setStartTime,
  setFinishTime,
  setStartWeight,
  $startWeight,
  $goalWeight,
  setGoalWeight,
  setEmptyGoal,
} from "./model";
import { timePredicator } from "../utils";

interface GoalBuilderProps {
  setCloseDialog: (show: boolean) => void;
}

export const GoalBuilder: React.FC<GoalBuilderProps> = ({ setCloseDialog }) => {
  const startDate = useStore($dateStart);
  const finishDate = useStore($dateFinish);
  const startWeight = useStore($startWeight);
  const goalWeight = useStore($goalWeight);

  const setGoal = (e: any) => {
    e.preventDefault();
    setEmptyGoal();
    setCloseDialog(false);
  };

  return (
    <form>
      <h3>StartDate</h3>
      <Calendar
        hideOnDateTimeSelect
        placeholder={"- Начало -"}
        selectionMode={"single"}
        hourFormat={"24"}
        dateFormat={"dd M yy"}
        value={startDate || undefined}
        onChange={(e) => setStartTime(timePredicator(e.value))}
      />
      <h3>FinishDate</h3>
      <Calendar
        hideOnDateTimeSelect
        placeholder={"- Конец -"}
        selectionMode={"single"}
        hourFormat={"24"}
        dateFormat={"dd M yy"}
        value={finishDate || undefined}
        onChange={(e) => setFinishTime(timePredicator(e.value))}
        minDate={startDate || undefined}
      />
      <h3>Start weight</h3>
      <InputNumber
        value={startWeight}
        onChange={(e) => {
          if (!isNaN(e.value)) setStartWeight(e.value);
        }}
        onKeyDown={(e) => {
          if (!/[\d.,]/g.test(e.key)) e.preventDefault();
        }}
        step={0.25}
        showButtons
        min={0}
        max={200}
      />
      <h3>nessesary weight </h3>
      <InputNumber
        value={goalWeight}
        step={0.25}
        showButtons
        min={0}
        max={startWeight}
        onChange={(e) => {
          if (!isNaN(e.value)) setGoalWeight(e.value);
        }}
        onKeyDown={(e) => {
          if (!/[\d.,]/g.test(e.key)) e.preventDefault();
        }}
      />
      <Button onClick={setGoal}>Создать</Button>
    </form>
  );
};
