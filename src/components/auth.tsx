import { useStore } from "effector-react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  $errorAuth,
  $loggedUser,
  logIn,
  pendings,
  setAuthData,
} from "../features/auth/model";

export const AuthForm = () => {
  const wrongPassword = useStore($errorAuth);
  const user = useStore($loggedUser);
  const navigate = useNavigate();
  const pending = useStore(pendings);

  useEffect(() => {
    if (!!user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  if (pending) return <div>Loading...</div>;

  return (
    <form>
      <h1>Вход/регистрация</h1>
      <InputText
        placeholder={"имя/емайл"}
        onChange={(e) => {
          setAuthData({ user: e.target.value });
        }}
      />
      <InputText
        placeholder={"паролъ"}
        type="password"
        onChange={(e) => {
          setAuthData({ password: e.target.value });
        }}
      />
      {wrongPassword && <span style={{ color: "red" }}>неверные пароль</span>}
      <Button
        onClick={(e) => {
          e.preventDefault();
          logIn();
        }}
      >
        LogIn
      </Button>
    </form>
  );
};
