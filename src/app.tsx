// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import axios from 'axios';
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
window.db = db;


const service = axios.create({
  // baseURL: 'http://localhost:8081'
  baseURL: 'http://192.168.1.108:8081'
});
window.axios = service

