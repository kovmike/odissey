import { createStore, createDomain, combine, Store, sample } from "effector";
import { child, get, ref, set } from "firebase/database";
import { dataBase } from "../assets/firebaseConfig";
import { $loggedUser } from "../features/auth/model";
import { data } from "./data";
import { Point } from "./types";

const setter = (path: string, data: any) => {
  const dbRef = ref(dataBase, "users/" + `${path}`);
  return set(dbRef, data);
};

const root = createDomain("root");

/*events*/
export const setStartTime = root.createEvent<Date | null>();
export const setFinishTime = root.createEvent<Date | null>();
export const setStartWeight = root.createEvent<number>();
export const setGoalWeight = root.createEvent<number>();
export const setEmptyGoal = root.createEvent<void>();

/**effects */
export const setEmptyGoalFx = root.createEffect<
  { path: string; data: any },
  any,
  any
>(async ({ path, data }) => {
  return await setter(path, data);
});

/**stores */
export const $chartData = root.createStore<Point[]>(data);
export const $startWieght = root.createStore<number>(0);
export const $goalWeight = root.createStore<number>(0);
export const $dateStart = root.createStore<Date | null>(null);
export const $dateFinish = root.createStore<Date | null>(null);

$dateStart.on(setStartTime, (_, start) => start);
$dateFinish.on(setFinishTime, (_, finish) => finish);
$startWieght.on(setStartWeight, (_, weight) => weight);
$goalWeight.on(setGoalWeight, (_, goalWeight) => goalWeight);

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
    return timeCode.map((date) => date.split(",")[0]);
  }
);

export const $combinedChartData = combine<
  string[],
  number,
  number,
  { [x: string]: string }
>($dateLine, $startWieght, $goalWeight, (dateLine, startWeight, goal) => {
  return dateLine.reduce((acc: { [x: string]: any }, date, index, dl) => {
    acc[date] = {
      name: date,
      goal: startWeight - ((startWeight - goal) / dl.length) * index,
      fact: 0,
    };
    return acc;
  }, {});
});

sample({
  //TODO убрать "!""
  source: combine($loggedUser, $combinedChartData, (user, data) => ({
    user,
    data,
  })),
  clock: setEmptyGoal,
  fn: ({ user, data }) => ({ path: `${user!.uid}/goal`, data }),
  target: setEmptyGoalFx,
});

//$startWieght.watch(console.log);
