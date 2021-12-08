import { createDomain, sample } from "effector";
import { DataSnapshot } from "firebase/database";
import { getter, setter } from "../../assets/firebaseUtils";
import { signUpFx, signInFx } from "../auth/model";

const goal = createDomain();

export const setNewUserFx = goal.createEffect(async (user: string) => {
  return await setter(`${user}`, {
    username: "Valera",
    user,
    startWeight: 0,
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
