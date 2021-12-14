import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const Review: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <header className="user">
        review
        <Button
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          back to home
        </Button>
      </header>

      {/* {fullData?.startWeight === 0 ? (
        <NoGoal />
      ) : (
        <>
          {!youLooser ? (
            <span className="goal">{`Твоя цель: сбросить вес до ${
              fullData?.goalWeight
            }кг к ${new Date(fullData?.dateFinish!).toLocaleDateString(
              "ru"
            )}`}</span>
          ) : (
            <span>Ты не справился</span>
          )}
          <div className="charts">
            <Chart />
          </div>
          <div className="data-table">
            <WeightTable />
          </div>
        </>
      )} */}
    </div>
  );
};
