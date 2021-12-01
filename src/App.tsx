import { useStore } from "effector-react";
import { addLocale, locale } from "primereact/api";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import { $loggedUser } from "./features/auth";
import { ruCalendarLocale } from "./locales";
import { Auth } from "./pages/Auth";
import { HomePage } from "./pages/Home";

addLocale("ru", ruCalendarLocale);
locale("ru");
export const App: React.FC = () => {
  const user = useStore($loggedUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<HomePage user={user} />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};
