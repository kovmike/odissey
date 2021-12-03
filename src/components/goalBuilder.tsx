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
  $startWieght,
  $goal,
  setGoal,
} from "./model";
import { timePredicator } from "../utils";

export const GoalBuilder: React.FC = () => {
  const startDate = useStore($dateStart);
  const finishDate = useStore($dateFinish);
  const startWeight = useStore($startWieght);
  const goal = useStore($goal);

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
        value={goal}
        step={0.25}
        showButtons
        min={0}
        max={startWeight}
        onChange={(e) => {
          if (!isNaN(e.value)) setGoal(e.value);
        }}
        onKeyDown={(e) => {
          if (!/[\d.,]/g.test(e.key)) e.preventDefault();
        }}
      />
    </form>
  );
};
