import { Calendar } from "primereact/calendar";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { useStore } from "effector-react";
import { $dateFinish, $dateStart, setStartTime, setFinishTime } from "./model";
import { timePredicator } from "../utils";


export const DatePicker: React.FC = () => {
  const start = useStore($dateStart);
  const finish = useStore($dateFinish);
  return (
    <div>
      <h3>StartDate</h3>
      <Calendar
        hideOnDateTimeSelect
        placeholder={"- Начало -"}
        selectionMode={"single"}
        hourFormat={"24"}
        dateFormat={"dd M yy"}
        value={start || undefined}
        onChange={(e) => setStartTime(timePredicator(e.value))}
      />
      <h3>FinishDate</h3>
      <Calendar
        hideOnDateTimeSelect
        placeholder={"- Конец -"}
        selectionMode={"single"}
        hourFormat={"24"}
        dateFormat={"dd M yy"}
        value={finish || undefined}
        onChange={(e) => setFinishTime(timePredicator(e.value))}
        minDate={start || undefined}
      />
    </div>
  );
};
