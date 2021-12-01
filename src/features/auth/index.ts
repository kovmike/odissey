import { FirebaseApp } from "@firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export interface SingUpData {
  app: FirebaseApp;
  email: string;
  password: string;
}

export const singUp = ({ app, email, password }: SingUpData): Promise<any> => {
  const auth = getAuth(app);
  return createUserWithEmailAndPassword(auth, email, password);
};
