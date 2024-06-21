// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQ0epteeJsPrzesTWoyBojymN5L5b9kzk",
  authDomain: "react-chat-app-3e7a4.firebaseapp.com",
  projectId: "react-chat-app-3e7a4",
  storageBucket: "react-chat-app-3e7a4.appspot.com",
  messagingSenderId: "41817700309",
  appId: "1:41817700309:web:2e1ec5a27991668824ef5c",
  measurementId: "G-LT29C4N433"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();
const analytics = getAnalytics(app);