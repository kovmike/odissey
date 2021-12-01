import { FirebaseApp } from "firebase/app";

export interface SingUpData {
  app: FirebaseApp;
  user: string;
  password: string;
}
