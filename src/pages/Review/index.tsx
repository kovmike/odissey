import { Button } from "antd";
import { useStore } from "effector-react";
import { useNavigate } from "react-router-dom";
import { Chart } from "../../components/chart";
import { WeightTable } from "../../components/weight-table";
import { $reviewedUser } from "../../features/usersExp/model";

export const Review: React.FC = () => {
  const navigate = useNavigate();
  const reviewedUser = useStore($reviewedUser);

  return (
    <div className="homepage">
      <header className="user">
        <Button
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          Обратно к своим целям
        </Button>
      </header>

      {reviewedUser?.startWeight === 0 ? (
        <span className="goal">У товарища нет цели</span>
      ) : (
        <>
          <span className="goal">{`Цель ${
            reviewedUser?.username
          } : сбросить вес до ${reviewedUser?.goalWeight}кг к ${new Date(
            reviewedUser?.dateFinish!
          ).toLocaleDateString("ru")}`}</span>

          <div className="charts">
            <Chart user={reviewedUser!} />
          </div>
          <div className="data-table">
            <WeightTable />
          </div>
        </>
      )}
    </div>
  );
};
