import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import { firebaseConfig } from "./firebase_config";

const firebase_app = initializeApp(firebaseConfig);
const db = getFirestore(firebase_app);

export function write_database_element(db_name, element) {
  addDoc(collection(db, db_name), element).then();
}
