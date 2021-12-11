import { useStore } from "effector-react";
import { Column, ColumnEditorOptions } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputNumber } from "primereact/inputnumber";
import { isPositiveValue } from "../utils";
import { $chartData, setFactValue } from "./model";
import { CompleteOptions } from "./types";

export const WeightTable: React.FC = () => {
  const chartData = useStore($chartData);

  const factEditor = (options: ColumnEditorOptions) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e) => options.editorCallback!(e.value)}
      />
    );
  };

  const onCellEditComplete = (e: CompleteOptions) => {
    const { rowData, newValue, field, originalEvent: event } = e;
    if (isPositiveValue(newValue)) {
      setFactValue({ name: rowData.name, newValue });
      rowData[field] = newValue;
    } else event.preventDefault();
  };

  return (
    <DataTable
      value={chartData!}
      editMode="cell"
      showGridlines
      responsiveLayout="scroll"
    >
      <Column style={{ width: "33%" }} field="name" header="Дата" />
      <Column style={{ width: "33%" }} field="goal" header="Цель" />
      <Column
        key="fact"
        style={{ width: "33%" }}
        field="fact"
        header="Факт"
        editor={(options) => factEditor(options)}
        onCellEditComplete={onCellEditComplete}
      />
    </DataTable>
  );
};
