export interface Point {
  name: string;
  goal: number;
  fact: number;
  rating?: { [x: string]: 0 | 1 };
}

export interface DBUser {
  dateFinish: Date;
  goal: { [key: string]: Point } | { startWeight: number };
  goalWeight: number;
  startWeight: number;
  user: string;
  username: string;
}
