import { useState } from "react";
import { Button, Table, Tooltip } from "antd";
import { DislikeTwoTone, SmileTwoTone } from "@ant-design/icons";
import { EditableCell } from "./editable-cell";
import { DBUser, Point } from "./types";
import { RatingButtons } from "./rating-buttons";
import { RatingInfo } from "./rating-info";

export const WeightTable: React.FC<{ user: DBUser; review: boolean }> = ({
  user,
  review,
}) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const chartData = Object.values(user.goal);

  const columns = [
    {
      title: "Дата",
      dataIndex: "name",
      key: "dateName",
      align: "center" as "center",
    },
    {
      title: "Цель",
      dataIndex: "goal",
      key: "goal",
      align: "center" as "center",
    },
    {
      title: "Факт",
      dataIndex: "fact",
      key: "fact",
      align: "center" as "center",
      render: (text: number, record: Point, index: number) => {
        return editIndex !== index ? (
          <h4
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEditIndex(index);
            }}
          >
            {text}
          </h4>
        ) : (
          <EditableCell value={record} setEditIndex={setEditIndex} />
        );
      },
    },
    {
      title: "Рейтинг",
      dataIndex: "fact",
      key: "rating",
      align: "center" as "center",
      render: () => (review ? <RatingButtons /> : <RatingInfo />),
    },
  ];

  return (
    chartData && (
      <Table
        dataSource={chartData}
        pagination={false}
        size="small"
        columns={columns}
        bordered
        scroll={{ y: 600 }}
      ></Table>
    )
  );
};
