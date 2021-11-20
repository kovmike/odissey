import { addLocale, locale } from "primereact/api";
import "./App.scss";
import { Chart } from "./components/chart";
import { DatePicker } from "./components/datepicker";
import { ruCalendarLocale } from "./locales";

addLocale("ru", ruCalendarLocale);
locale("ru");
export const App: React.FC = () => {
  return (
    <div className="App">
      <DatePicker />
      <Chart />
    </div>
  );
};
