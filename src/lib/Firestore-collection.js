import { collection, doc } from "firebase/firestore";
import { db } from "./Firebase-config";

export const noteCollectionRef = collection(db, "notes");
export const noteDocRef = (id) => doc(db, "notes", id);
export const userDocRef = (uid) => collection(db, "users", uid, "notes");
