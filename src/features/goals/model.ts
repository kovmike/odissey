import { createDomain, sample } from "effector";
import { child, get, ref, set } from "firebase/database";
import { dataBase } from "../../assets/firebaseConfig";
import { signUpFx, signInFx, $loggedUser } from "../auth/model";

const goal = createDomain();

const mock = {
  startWeight: 50,
  nesWeight: 40,
  startDate: "1212",
  finshDate: "fsfff",
};

const setter = (path: string, data: any) => {
  const dbRef = ref(dataBase, "users/" + `${path}`);
  return set(dbRef, data);
};

export const testSet = goal.createEvent<void>();

export const setNewUserFx = goal.createEffect(async (user: string) => {
  const dbRef = ref(dataBase, "users/" + `${user}`);
  return await set(dbRef, {
    username: "Valera",
    user,
    goal: { startWeight: 0 },
  });
});

export const testSetGoalFx = goal.createEffect<
  { path: string; data: any },
  any,
  any
>(async ({ path, data }) => {
  return await setter(path, data);
});

export const getExistsUserDataFx = goal.createEffect(async (user: string) => {
  const dbRef = ref(dataBase);
  return await get(child(dbRef, `users/${user}`));
});

export const $userGoal = goal.createStore<any>(null);
export const $success = goal.createStore<boolean>(false);

$userGoal.on(getExistsUserDataFx.doneData, (_, goalData) => goalData.val());

sample({
  source: signUpFx.doneData,
  fn: ({ user }) => user.uid,
  target: setNewUserFx,
});

sample({
  source: signInFx.doneData,
  fn: ({ user: { uid } }) => uid,
  target: getExistsUserDataFx,
});

sample({
  source: setNewUserFx.done,
  fn: ({ params }) => params,
  target: getExistsUserDataFx,
});

sample({
  source: $loggedUser,
  clock: testSet,
  fn: (user) => ({ path: `${user.uid}/goal`, data: mock }),
  target: testSetGoalFx,
});

// getExistsUserDataFx.doneData.watch((data) => {
//   if (data.exists()) console.log(data.val());
// })
