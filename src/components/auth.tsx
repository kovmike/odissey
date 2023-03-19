import { Button, Input, Space, Spin } from "antd";
import { useStore } from "effector-react";
import {
  UserOutlined,
  UnlockOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
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
    if (!!user) navigate("/", { replace: true });
  }, [user]);

  if (pending)
    return (
      <>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 150 }} spin />} />
        <span className="scha">Ща, ща, ща...</span>
      </>
    );

  return (
    <form>
      <Space direction="vertical">
        <h1>Вход/регистрация</h1>
        <Input
          placeholder="имя/емайл"
          prefix={<UserOutlined className="site-form-item-icon" />}
          onChange={(e) => {
            setAuthData({ user: e.target.value });
          }}
        />
        <Input.Password
          prefix={<UnlockOutlined />}
          placeholder="паролъ"
          onChange={(e) => {
            setAuthData({ password: e.target.value });
          }}
        />

        {wrongPassword && <span style={{ color: "red" }}>неверный пароль</span>}
        <Button
          type="primary"
          onClick={(e) => {
            e.preventDefault();
            logIn();
          }}
        >
          Войди
        </Button>
      </Space>
    </form>
  );
};
