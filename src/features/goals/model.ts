import { createDomain, sample } from "effector";
import { DataSnapshot } from "firebase/database";
import { getter, setter } from "../../assets/firebaseUtils";
import { User } from "../../components/types";
import { signUpFx, signInFx } from "../auth/model";

const goal = createDomain();

export const setNewUserFx = goal.createEffect(async (user: string) => {
  return await setter(`${user}`, {
    username: user.split("@")[0],
    user,
    startWeight: 0,
    goalWeight: 0,
    dateFinish: "",
    goal: { startWeight: 0 },
  });
});

export const getExistsUserDataFx = goal.createEffect<
  string,
  DataSnapshot,
  Error
>(async (user: string) => {
  return await getter(`users/${user}`);
});

export const $userFullData = goal.createStore<User|null>(null);
export const $success = goal.createStore<boolean>(false);

$userFullData.on(getExistsUserDataFx.doneData, (_, userData) => userData.val());

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

//$userFullData.watch(console.log);
