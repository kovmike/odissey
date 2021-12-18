import { createDomain, sample } from "effector";
import { DataSnapshot } from "firebase/database";
import { getter, setter } from "../../assets/firebaseUtils";
import { DBUser } from "../../components/types";
import { signUpFx, signInFx } from "../auth/model";

const goal = createDomain();

export const setNewUserFx = goal.createEffect<
  { uid: string; email: string },
  Promise<void>,
  Error
>(async ({ uid, email }) => {
  return await setter(`${uid}`, {
    username: email.split("@")[0],
    user: uid,
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

export const $userFullData = goal.createStore<DBUser | null>(null);

$userFullData.on(getExistsUserDataFx.doneData, (_, userData) => userData.val());

sample({
  source: signUpFx.doneData,
  fn: ({ user: { uid, email } }) => ({ uid, email }),
  target: setNewUserFx,
});

sample({
  source: signInFx.doneData,
  fn: ({ user: { uid } }) => uid,
  target: getExistsUserDataFx,
});

sample({
  source: setNewUserFx.done,
  fn: ({ params: { uid } }) => uid,
  target: getExistsUserDataFx,
});

