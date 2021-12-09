import { createDomain, combine, Store, sample } from "effector";
import { getter, setter, updater } from "../assets/firebaseUtils";
import { $loggedUser } from "../features/auth/model";
import { getExistsUserDataFx } from "../features/goals/model";
import { Point } from "./types";

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
  Promise<void>,
  any
>(async ({ path, data }) => {
  return await setter(path, data);
});

export const getChartDataFx = root.createEffect(
  async ({ path }: { path: string }) => {
    return await getter(`users/${path}`);
  }
);

export const updateUserDataFx = root.createEffect<
  { path: string; userData: any },
  Promise<void>,
  Error
>(async ({ path, userData }) => {
  return await updater(`${path}`, userData);
});

/**stores */
export const $chartData = root.createStore<Point[] | null>(null);
export const $startWeight = root.createStore<number>(0);
export const $goalWeight = root.createStore<number>(0);
export const $dateStart = root.createStore<Date | null>(null);
export const $dateFinish = root.createStore<Date | null>(null);

$dateStart.on(setStartTime, (_, start) => start);
$dateFinish.on(setFinishTime, (_, finish) => finish);
$startWeight.on(setStartWeight, (_, weight) => weight);
$goalWeight.on(setGoalWeight, (_, goalWeight) => goalWeight);
$chartData
  .on(getChartDataFx.doneData, (_, data) => Object.values(data.val()))
  .on(getExistsUserDataFx.doneData, (_, data) =>
    Object.values(data.val().goal)
  );

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
    return timeCode.map((date) => date.split(",")[0].replace(/\./g, "-"));
  }
);

export const $combinedChartData = combine<
  string[],
  number,
  number,
  { [x: string]: string }
>($dateLine, $startWeight, $goalWeight, (dateLine, startWeight, goal) => {
  return dateLine.reduce((acc: { [x: string]: any }, date, index, dl) => {
    acc[date] = {
      name: date,
      goal: startWeight - ((startWeight - goal) / dl.length) * index,
      fact: 0,
    };
    return acc;
  }, {});
});

export const $combinedUserData = combine(
  $startWeight,
  $goalWeight,
  $dateFinish,
  (startWeight, goalWeight, dateFinish) => ({
    startWeight,
    goalWeight,
    dateFinish,
  })
);

sample({
  source: combine($loggedUser, $combinedChartData, (user, data) => ({
    user,
    data,
  })),
  clock: setEmptyGoal,
  fn: ({ user, data }) => ({ path: `${user!.uid}/goal`, data }),
  target: setEmptyGoalFx,
});

sample({
  clock: setEmptyGoalFx.done,
  source: combine($loggedUser, $combinedUserData, (user, userData) => ({
    path: `${user?.uid}/`,
    userData,
  })),
  // fn:(c)=>c,
  target: updateUserDataFx,
});

sample({
  source: setEmptyGoalFx.done,
  fn: ({ params }) => params,
  target: getChartDataFx,
});

//TODO Переписать updater
$chartData.watch(console.log);
