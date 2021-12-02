import { useStore } from "effector-react";
import { Button } from "primereact/button";
import { $success, setData } from "../../features/goals/model";

export const HomePage: React.FC<{ user: any }> = ({ user }) => {
  const suc = useStore($success);
  return (
    <div>
      <span>{user}</span>
      <Button label="set" onClick={() => setData()} />
      {suc && <span>goood</span>}
    </div>
  );
};
