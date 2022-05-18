import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAojE1rmv-tD-l3-XLn5BT5ext077HH0pI",
  authDomain: "sticky-notes-24d97.firebaseapp.com",
  projectId: "sticky-notes-24d97",
  storageBucket: "sticky-notes-24d97.appspot.com",
  messagingSenderId: "414818507608",
  appId: "1:414818507608:web:976ccd09bd3b274810a32d",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const authentication = getAuth(app);
