import { useStore } from "effector-react";
import { addLocale, locale } from "primereact/api";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import { RequireAuth } from "./features/auth/AuthWrapper";
import { $loggedUser, pendings } from "./features/auth/model";
import { ruCalendarLocale } from "./locales";
import { Auth } from "./pages/Auth";
import { HomePage } from "./pages/Home";

addLocale("ru", ruCalendarLocale);
locale("ru");
export const App: React.FC = () => {
  const navigate = useNavigate();
  const user = useStore($loggedUser);

  useEffect(() => {
    if (!user) navigate("/auth");
  }, []);

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <HomePage user={user} />
          </RequireAuth>
        }
      />
    </Routes>
  );
};
