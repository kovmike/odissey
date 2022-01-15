import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Table } from "antd";
import { EditableCell } from "./editable-cell";
import { DBUser, Point, RowProps } from "./types";
import { RatingButtons } from "./rating-buttons";
import { RatingInfo } from "./rating-info";

export const WeightTable: React.FC<{ user: DBUser; review: boolean }> = ({
  user,
  review,
}) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formatedToday] = useState(
    new Date().toLocaleString().split(",")[0].split(".").reverse().join("-")
  );
  const todayRow = useRef<HTMLTableRowElement | null>(null);
  const chartData = Object.values(user.goal).map((record) => ({
    ...record,
    key: record.name,
  }));

  useEffect(() => {
    if (todayRow && todayRow.current)
      todayRow.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const rowRefWrapper = ({ className, ...props }: RowProps) => {
    if (props["data-row-key"] === formatedToday)
      return <tr ref={todayRow} className={`${className} today`} {...props} />;
    return <tr className={className} {...props} />;
  };

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
        components={{ body: { row: rowRefWrapper } }}
        dataSource={chartData}
        pagination={false}
        size="small"
        columns={columns}
        bordered
        scroll={{ y: 500 }}
      ></Table>
    )
  );
};
