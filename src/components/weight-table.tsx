import { Table } from "antd";
import { useStore } from "effector-react";
import { useState } from "react";
import { EditableCell } from "./editable-cell";
import { $chartData } from "./model";

export const WeightTable: React.FC = () => {
  const chartData = useStore($chartData);
  const [editIndex, setEditIndex] = useState<number | null>(null);

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
      render: (text: any, record: any, index: any) => {
        return editIndex !== index ? (
          <h4
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
