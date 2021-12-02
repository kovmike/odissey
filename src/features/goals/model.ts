import {
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from "effector";
import { ref, set } from "firebase/database";
import { dataBase } from "../../assets/firebaseConfig";

const dbRef = ref(dataBase, "users/" + "asd123");
export const setData = createEvent();

export const setFx = createEffect(async () => {
  return await set(dbRef, { username: "name", email: "emsail" });
});

export const $success = createStore<boolean>(false);

forward({
  from: setData,
  to: setFx,
});

sample({
  source: setFx.failData,
  fn: (data) => {
    console.log(data);
    return true;
  },
  target: $success,
});
