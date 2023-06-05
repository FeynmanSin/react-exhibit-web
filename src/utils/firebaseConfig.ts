// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOHfQZ4ydtxT_iwMgAi0Z40jzZIABFN8M",
  authDomain: "react-exhibit.firebaseapp.com",
  projectId: "react-exhibit",
  storageBucket: "react-exhibit.appspot.com",
  messagingSenderId: "355873709645",
  appId: "1:355873709645:web:2dc4acec14985f326e0604",
  measurementId: "G-XGWTC13PE4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
console.log(db);