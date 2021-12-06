import { createDomain, sample } from "effector";
import { child, get, ref, set } from "firebase/database";
import { dataBase } from "../../assets/firebaseConfig";
import { signUpFx, signInFx } from "../auth/model";

const goal = createDomain();

export const setNewUserFx = goal.createEffect(async (user: string) => {
  const dbRef = ref(dataBase, "users/" + `${user}`);
  return await set(dbRef, {
    username: "Valera",
    user,
    goal: { startWeight: 0 },
  });
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
