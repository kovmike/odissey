import { addLocale, locale } from "primereact/api";
import "./App.scss";
import { Chart } from "./components/chart";
import { GoalBuilder } from "./components/goalBuilder";
import { ruCalendarLocale } from "./locales";

addLocale("ru", ruCalendarLocale);
locale("ru");
export const App: React.FC = () => {
  return <div className="App">app</div>;
};
