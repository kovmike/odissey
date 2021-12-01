import { createStore, createDomain, combine, Store } from "effector";
import { data } from "./data";
import { Point } from "./types";

const root = createDomain("root");

export const setStartTime = root.createEvent<Date | null>();
export const setFinishTime = root.createEvent<Date | null>();
export const setStartWeight = root.createEvent<number>();
export const setGoal = root.createEvent<number>();

export const $chartData = root.createStore<Point[]>(data);
export const $startWieght = root.createStore<number>(0);
export const $goal = root.createStore<number>(0);
export const $dateStart = root.createStore<Date | null>(null);
export const $dateFinish = root.createStore<Date | null>(null);

$dateStart.on(setStartTime, (_, start) => start);
$dateFinish.on(setFinishTime, (_, finish) => finish);
$startWieght.on(setStartWeight, (_, weight) => weight);
$goal.on(setGoal, (_, goal) => goal);

export const $dateLine: Store<string[]> = combine(
  $dateStart,
  $dateFinish,
  (start, finish) => {
    if (!start || !finish) return [""];
    let timeCode = [];
    let timeCounter = start.getTime();
    while (timeCounter < finish.getTime()) {
      timeCode.push(new Date(timeCounter).toLocaleString("ru"));
      timeCounter = timeCounter + 24 * 60 * 60 * 1000;
    }
    return timeCode;
  }
);

export const $combinedChartData = combine(
  $dateLine,
  $startWieght,
  $goal,
  (dateLine, startWeight, goal) => {
    return dateLine.map((date, index, dl) => ({
      name: date,
      goal: startWeight - ((startWeight - goal) / dl.length) * index,
      startWeight,
    }));
  }
);

//$startWieght.watch(console.log);
