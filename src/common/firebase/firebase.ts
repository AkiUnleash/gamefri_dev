import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import 'firebase/analytics'
import 'firebase/functions'

import { firebaseConfig } from "./firebase.conf"


const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const provider = new firebase.auth.GoogleAuthProvider();
export const functions = firebase.functions();

export const serverTime = firebase.firestore.FieldValue.serverTimestamp()

// Filebase local emulater
if (process.env.DEV_MODE === "local_emulator") {
  // Authentication用の設定
  firebase.auth().useEmulator("http://localhost:9099/");

  // // Cloud Functions用の設定
  // const functions = firebase.app().functions("");
  // functions.useEmulator("localhost", 5001);

  // Firestore用の設定
  firebase.firestore().settings({ host: "localhost:8081", ssl: false });
}
