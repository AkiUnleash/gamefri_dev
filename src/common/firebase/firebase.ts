import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { firebaseConfig } from "./firebase.conf"


const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const provider = new firebase.auth.GoogleAuthProvider();

export const serverTime = firebase.firestore.FieldValue.serverTimestamp()