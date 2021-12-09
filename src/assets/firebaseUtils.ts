import { child, get, ref, set, update } from "firebase/database";
import { dataBase } from "./firebaseConfig";

//wrire to db
export const setter = (path: string, data: any) => {
  const dbRef = ref(dataBase, `users/${path}`);
  return set(dbRef, data);
};

//read from db
export const getter = (path: string) => {
  const dbRef = ref(dataBase);
  return get(child(dbRef, path));
};

//update in db
export const updater = (path: string, data: any) => {
  const dbRef = ref(dataBase);
  return update(dbRef, { [`users/${path}`]: data });
};


/**comments by KO */