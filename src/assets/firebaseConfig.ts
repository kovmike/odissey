import { getDatabase } from "@firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDKq3gFik7hQ6dgg3ZAS_imL2UlwBoAOLk",
  authDomain: "odyssey-e6300.firebaseapp.com",
  databaseURL:
    "https://odyssey-e6300-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "odyssey-e6300",
  storageBucket: "odyssey-e6300.appspot.com",
  messagingSenderId: "940165584706",
  appId: "1:940165584706:web:a90ed5078e40c7b4a49adb",
  measurementId: "G-6FM51BKL1G",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const dataBase = getDatabase(app);
