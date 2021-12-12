export interface Point {
  name: string;
  goal: number;
  fact: number;
  [key: string]: number | string;
}

export interface User {
  dateFinish: Date;
  goal: Point[] | { startWeight: number };
  goalWeight: number;
  startWeight: number;
  user: string;
  username: string;
}
