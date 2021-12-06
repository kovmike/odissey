export interface Point {
  name: string;
  goal: number;
  fact: number;
  [key: string]: number | string;
}

export interface FirebaseChartData {
  [x: string]: Point;
}
