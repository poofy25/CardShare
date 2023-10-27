// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider , FacebookAuthProvider , signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { doc , setDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import writeUserToDb from "./writeUserToDb";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhrrzvegyhwIvK3_K-XiFv8BtInuJlKtg",
  authDomain: "cardshare0.firebaseapp.com",
  projectId: "cardshare0",
  storageBucket: "cardshare0.appspot.com",
  messagingSenderId: "930571690387",
  appId: "1:930571690387:web:a9b2f595ee86f31908c866",
  measurementId: "G-1NXHVJB9MR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);









// auth.onAuthStateChanged(user =>{
//   console.log('user changed' , user)
//    if (user){
//     writeUserToDb(user)
//    }
//  })