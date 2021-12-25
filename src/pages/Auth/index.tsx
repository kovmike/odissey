import { useEffect, useState } from "react";
import { AuthForm } from "../../components/auth";

export const Auth: React.FC = () => {
  const [w, setW] = useState(0);
  useEffect(() => {
    setW(document.documentElement.clientWidth);
  }, []);
  return (
    <div className={"auth-form"}>
      {w}
      <AuthForm />
    </div>
  );
};
