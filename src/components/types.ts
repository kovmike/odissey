import { ColumnEventParams } from "primereact/column";

export interface Point {
  name: string;
  goal: number;
  fact: number;
  [key: string]: number | string;
}

export interface FirebaseChartData {
  [x: string]: Point;
}

export interface User {
  dateFinish: Date;
  goal: Point[] | { startWeight: number };
  goalWeight: number;
  startWeight: number;
  user: string;
  username: string;
}

export interface CompleteOptions extends ColumnEventParams {
  rowData: any;
  newValue: string;
  field: string;
}