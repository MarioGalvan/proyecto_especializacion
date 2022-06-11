import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCkYso1DgUcd7UmfGQdcru9Wxb1sVc-itE",
  authDomain: "burguerfactory-90a58.firebaseapp.com",
  projectId: "burguerfactory-90a58",
  storageBucket: "burguerfactory-90a58.appspot.com",
  messagingSenderId: "371053922731",
  appId: "1:371053922731:web:c64f08169f10a6ebe76aee",
  measurementId: "G-RCZWN46PDV",
};

const firebaseApp = initializeApp();
const auth = getAuth(firebaseApp);
