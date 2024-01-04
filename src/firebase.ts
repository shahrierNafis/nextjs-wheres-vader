// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3DajhdAXIXh8PI-ZxcD2Ylnb9-giGVyo",
  authDomain: "wheres-vader.firebaseapp.com",
  projectId: "wheres-vader",
  storageBucket: "wheres-vader.appspot.com",
  messagingSenderId: "318697069108",
  appId: "1:318697069108:web:4f6c59ff9c5d2eecf5c861",
};

// Initialize Firebase
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const firestore = getFirestore(app);
if (typeof window !== "undefined") {
  if (window.location.hostname === "localhost") {
    connectFirestoreEmulator(firestore, "localhost", 8080);
  }
}
export { firestore };
