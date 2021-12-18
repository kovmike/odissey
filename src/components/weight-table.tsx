import { useState } from "react";
import { Table } from "antd";
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
              if (!review) setEditIndex(index);
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
      render: (text: number, record: Point, index: number) =>
        review ? (
          <RatingButtons record={record} />
        ) : (
          <RatingInfo record={record} />
        ),
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
