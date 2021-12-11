import { combine, createDomain, guard, sample } from "effector";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  User,
} from "firebase/auth";
import { app } from "../../assets/firebaseConfig";
import { SingUpData } from "./types";

const firebaseSignUp = ({
  app,
  user,
  password,
}: SingUpData): Promise<UserCredential> => {
  const auth = getAuth(app);
  return createUserWithEmailAndPassword(auth, user, password);
};

const firebaseSignIn = ({
  app,
  user,
  password,
}: SingUpData): Promise<UserCredential> => {
  const auth = getAuth(app);
  return signInWithEmailAndPassword(auth, user, password);
};

const authRoot = createDomain();

export const setLoggedUser = authRoot.createEvent<any>();
export const setAuthData = authRoot.createEvent<{ [key: string]: string }>();
export const logIn = authRoot.createEvent<void>();
const errorDetected = authRoot.createEvent<boolean>();

export const signUpFx = authRoot.createEffect<
  { [key: string]: string },
  any,
  any
>(async ({ user, password }) => {
  return await firebaseSignUp({ app, user, password });
});

export const signInFx = authRoot.createEffect<
  { [key: string]: string },
  UserCredential,
  any
>(async ({ user, password }) => {
  return await firebaseSignIn({ app, user, password });
});

export const $loggedUser = authRoot.createStore<User | null>(null);
export const $authData = authRoot.createStore<{ [key: string]: string }>({});
export const $errorAuth = authRoot.createStore<boolean>(false);

/**
 *
 */

$loggedUser
  .on(signUpFx.doneData, (_, { user }) => user)
  .on(signInFx.doneData, (_, { user }) => user);

$authData.on(setAuthData, (data, payload) => ({ ...data, ...payload }));

$errorAuth.on(errorDetected, (_, detected) => detected);

export const pendings = combine(
  [signInFx.pending, signUpFx.pending],
  (statuses) => statuses.some(Boolean)
);

//регистрация нового пользователя
guard({
  source: $authData,
  clock: logIn,
  filter: (data) => !!data.user && !!data.password,
  target: signUpFx,
});

//пользователь существует
guard({
  source: $authData,
  clock: signUpFx.failData,
  filter: (_, error) => {
    return error.message.includes("email-already-in-use");
  },
  target: signInFx,
});

//wrong pass
sample({
  source: signInFx.failData,
  fn: (error) => error.message.includes("wrong"),
  target: errorDetected,
});
