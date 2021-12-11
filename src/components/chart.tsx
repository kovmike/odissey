import { useStore } from "effector-react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { $userFullData } from "../features/goals/model";
import { $chartData } from "./model";
import { Point } from "./types";

export const Chart = () => {
  const data = useStore($chartData);
  const fullData = useStore($userFullData);

  const filteredFactlessData = (points: Point[]) =>
    points.map((point) => {
      if (point.fact === 0) {
        const { fact, ...withoutFactPoint } = point;
        return withoutFactPoint;
      }
      return point;
    });

  return (
    data && (
      <AreaChart
        width={800}
        height={250}
        data={filteredFactlessData(data)}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis domain={[(fullData?.startWeight || 100) + 5, (fullData?.goalWeight||0) - 5]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="basis"
          dataKey="goal"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="basis"
          dataKey="fact"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    )
  );
};
// dot={renderDot}
{
  /* <ResponsiveContainer width="100%" height="100%">
</ResponsiveContainer> */
}
