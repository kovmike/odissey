import {
  createDomain,
  combine,
  Store,
  sample,
  guard,
  createEffect,
  UnionToStoresUnion,
} from "effector";
import { getter, setter, updater } from "../../assets/firebaseUtils";
import { $loggedUser } from "../auth/model";
import { $userFullData, getExistsUserDataFx } from "../goals/model";
import { Point, DBUser } from "../../components/types";
import { DataSnapshot } from "firebase/database";

const root = createDomain("root");

/*events*/
export const setStartTime = root.createEvent<Date | null>();
export const setFinishTime = root.createEvent<Date | null>();
export const setStartWeight = root.createEvent<number>();
export const setGoalWeight = root.createEvent<number>();
export const setEmptyGoal = root.createEvent<void>();
export const setFactValue = root.createEvent<{ [path: string]: any }>();
export const getReviewedUser = root.createEvent<string>();
export const ratingMarkAdded =
  root.createEvent<{ path: string; rating: number }>();

/**effects */
const setEmptyGoalFx = root.createEffect<
  { path: string; data: any },
  Promise<void>,
  any
>(async ({ path, data }) => {
  return await setter(path, data);
});

const updateUserDataFx = root.createEffect<
  { [path: string]: any },
  Promise<void>,
  Error
>(async (userData) => {
  return await updater(userData);
});

const fetchUsersList = root.createEffect(() => {
  return getter("users");
});

const fetchReviewedUserDataFx = root.createEffect<string, DataSnapshot, Error>(
  async (user: string) => {
    return await getter(`users/${user}`);
  }
);

const addRatingMarkFx = createEffect<
  { path: string; rating: number },
  Promise<void>,
  Error
>(async ({ path, rating }) => {
  return await setter(path, rating);
});

/**stores */
export const $chartData = root.createStore<Point[] | null>(null);
export const $startWeight = root.createStore<number>(0);
export const $goalWeight = root.createStore<number>(0);
export const $dateStart = root.createStore<Date | null>(null);
export const $dateFinish = root.createStore<Date | null>(null);
export const $usersList = root.createStore<any>(null);
export const $reviewedUser = root.createStore<DBUser | null>(null);

/*reactions*/
$dateStart.on(setStartTime, (_, start) => start);
$dateFinish.on(setFinishTime, (_, finish) => finish);
$startWeight.on(setStartWeight, (_, weight) => weight);
$goalWeight.on(setGoalWeight, (_, goalWeight) => goalWeight);
$chartData.on(
  $userFullData,
  (_, fullData) => fullData && Object.values(fullData.goal)
);
$reviewedUser.on(fetchReviewedUserDataFx.doneData, (_, userData) =>
  userData.val()
);

/*combined stores*/
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
    return timeCode.map((date) =>
      date.split(",")[0].split(".").reverse().join("-")
    );
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
      goal: +(startWeight - ((startWeight - goal) / dl.length) * index).toFixed(
        2
      ),
      fact: index === 0 ? startWeight : 0,
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

//запись новой цели(создание расписания)
sample({
  source: combine($loggedUser, $combinedChartData, (user, data) => ({
    user,
    data,
  })),
  clock: setEmptyGoal,
  fn: ({ user, data }) => ({ path: `${user!.uid}/goal`, data }),
  target: setEmptyGoalFx,
});

//запись новых данных пользователя
sample({
  clock: setEmptyGoalFx.done,
  source: combine($loggedUser, $combinedUserData, (user, userData) => {
    return Object.entries(userData).reduce((acc, [key, value]) => {
      if (user) {
        return { ...acc, [`/users/${user.uid}/${key}`]: value };
      }
      return acc;
    }, {});
  }),
  target: updateUserDataFx,
});

//обновление данных пользоавтеля
guard({
  source: $loggedUser.map((user) => user?.uid),
  clock: updateUserDataFx.done,
  filter: Boolean,
  target: getExistsUserDataFx,
});

//обновление фактических данных
sample({
  source: $loggedUser,
  clock: setFactValue,
  fn: (user, { name, newValue }) => ({
    [`/users/${user!.uid}/goal/${name}/fact`]: newValue,
  }),
  target: updateUserDataFx,
});

//получение списка пользователей
guard({
  source: $loggedUser,
  filter: Boolean,
  target: fetchUsersList,
});

sample({
  source: $loggedUser,
  clock: fetchUsersList.doneData,
  fn: (loggedUser, userList) => {
    if (userList.exists()) {
      const { [loggedUser!.uid]: log, ...rest } = userList.val();
      return Object.values(rest);
    }
    return [];
  },
  target: $usersList,
});

//запрос просматриваемого юзера
sample({ source: getReviewedUser, target: fetchReviewedUserDataFx });

//проставление рейтинга
sample({
  source: guard({
    source: combine($loggedUser, $reviewedUser, (loggedUser, reviewedUser) => ({
      loggedUser,
      reviewedUser,
    })),
    filter: (users): users is Exclude<any, null> =>
      Object.values(users).every(Boolean),
  }),
  clock: ratingMarkAdded,
  fn: (users, { path, rating }) => ({
    path: `${users.reviewedUser.user}/goal/${path}/${users.loggedUser.uid}`,
    rating,
  }),
  target: addRatingMarkFx,
});

//обновление данных после проставления рейтинга
guard({
  source: $reviewedUser.map((user) => user?.user),
  clock: addRatingMarkFx.done,
  filter: Boolean,
  target: fetchReviewedUserDataFx,
});

//не справился
export const $youLooser = $chartData.map((data) => {
  const lastDay = data && data[data.length - 1];
  return lastDay && lastDay.fact !== 0 && lastDay.fact > lastDay.goal;
});
