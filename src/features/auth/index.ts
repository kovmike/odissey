import { FirebaseApp } from "@firebase/app";
import { createDomain, guard } from "effector";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../assets/firebaseConfig";

export interface SingUpData {
  app: FirebaseApp;
  user: string;
  password: string;
}

const firebaseSignUp = ({ app, user, password }: SingUpData): Promise<any> => {
  const auth = getAuth(app);
  return createUserWithEmailAndPassword(auth, user, password);
};

const firebaseSignIn = ({ app, user, password }: SingUpData): Promise<any> => {
  const auth = getAuth(app);
  return signInWithEmailAndPassword(auth, user, password);
};

const authRoot = createDomain();

export const setLoggedUser = authRoot.createEvent<any>();
export const setAuthData = authRoot.createEvent<{ [key: string]: string }>();
export const logIn = authRoot.createEvent<void>();

const signUpFx = authRoot.createEffect<{ [key: string]: string }, any, any>(
  async ({ user, password }) => {
    return firebaseSignUp({ app, user, password })
      .then((user) => user.user.json())
      .catch((error) => error.json());
  }
);

const signInFx = authRoot.createEffect<{ [key: string]: string }, any, any>(
  async ({ user, password }) => {
    return await firebaseSignIn({ app, user, password });
  }
);

export const $loggedUser = authRoot.createStore<any>(null);
export const $authData = authRoot.createStore<{ [key: string]: string }>({});

$loggedUser.on(signUpFx.doneData, (_, user) => user.email);
// .on(signInFx.doneData, (_, { user }) => user.email);

$authData.on(setAuthData, (data, payload) => ({ ...data, ...payload }));

//регистрация нового пользователя
guard({
  source: $authData,
  clock: logIn,
  filter: (data) => !!data.user && !!data.password,
  target: signUpFx,
});

//пользователь существует
// guard({
//   source: $authData,
//   clock: signUpFx.failData,
//   filter: (_, error) => {
//     console.log(error);
//     return error.message.includes("email-already-in-use");
//   },
//   target: signInFx,
// });

signUpFx.failData.watch((error) => console.log("Errof : = " + error.message));
$loggedUser.watch(console.log);
