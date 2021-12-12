import { useStore } from "effector-react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { RequireAuth } from "./features/auth/AuthWrapper";
import { $loggedUser} from "./features/auth/model";
import { Auth } from "./pages/Auth";
import { HomePage } from "./pages/Home";
import "./App.scss";

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
