export interface Point {
  name: string;
  goal: number;
  fact: number;
  [key: string]: number | string;
}

export interface DBUser {
  dateFinish: Date;
  goal: { [key: string]: Point } | { startWeight: number };
  goalWeight: number;
  startWeight: number;
  user: string;
  username: string;
}
