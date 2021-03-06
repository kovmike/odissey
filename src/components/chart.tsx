import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DBUser, Point } from "./types";

export const Chart: React.FC<{ user: DBUser }> = ({ user }) => {
  const filteredFactlessData = (points: { [x: string]: Point }) =>
    Object.values(points).map((point) =>
      point.fact === 0
        ? { name: point.name, ["цель"]: point.goal }
        : { name: point.name, ["цель"]: point.goal, ["факт"]: point.fact }
    );

  if (!user?.startWeight) return <></>;

  return (
    <ResponsiveContainer>
      <AreaChart
        data={filteredFactlessData(user.goal as { [x: string]: Point })}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorGoal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorFact" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#d88884" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis
          domain={[(user?.startWeight || 100) + 5, (user?.goalWeight || 0) - 5]}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="basis"
          dataKey="цель"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorGoal)"
        />
        <Area
          type="basis"
          dataKey="факт"
          stroke="#d88884"
          fillOpacity={1}
          fill="url(#colorFact)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
