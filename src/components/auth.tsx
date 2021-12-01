import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router";
import { logIn, setAuthData } from "../features/auth";

export const AuthForm = () => {
  const navigate = useNavigate();

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
      <Button
        onClick={(e) => {
          e.preventDefault();
          logIn();
          //navigate("/");
        }}
      >
        LogIn
      </Button>
    </form>
  );
};
