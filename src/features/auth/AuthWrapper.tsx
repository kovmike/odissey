import { useStore } from "effector-react";
import { Navigate, useLocation } from "react-router-dom";
import { $loggedUser } from "./model";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const loggedUser = useStore($loggedUser);
  const location = useLocation();

  if (!loggedUser) {
    return <Navigate to="/auth" state={{ from: location }} />;
  }

  return children;
};
