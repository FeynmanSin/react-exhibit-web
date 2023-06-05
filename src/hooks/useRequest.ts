import { useState, useEffect } from 'react'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
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
const analytics = getAnalytics(app);
const db = getFirestore(app);

// todo: 请求hooks
const useRequest = (url: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [resData, setResData] = useState<any>();
  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    const querySnapshot = await getDocs(collection(db, url));
    querySnapshot.forEach((doc) => {
      setResData(doc.data());
    });
    setIsLoading(false);
  }

  const post = (data: object) => {

  }
  const put = async (data: object) => {
    await updateDoc(doc(db, url, "SiNyqVRVtLTEqT7CbfjwCjxNlSJ2"), data);
    setIsLoading(false);

  }

  return { isLoading, resData, get, post, put }
}

export default useRequest