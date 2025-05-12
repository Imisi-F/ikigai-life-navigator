
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ikigai-8e493.firebaseapp.com",
  projectId: "ikigai-8e493",
  storageBucket: "ikigai-8e493.firebasestorage.app",
  messagingSenderId: "816975772924",
  appId: "1:816975772924:web:2d86061bff4f92b49a6b79",
  measurementId: "G-XQSDFHYELE"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// //import { getAnalytics } from "firebase/analytics";
// import firebaseConfig from './firebaseConfig';
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// export const firebaseConfig = {
//   apiKey: "AIzaSyDfkgiOiczenRlT-_ce1YCtMGbo3-JhzKw",
//   authDomain: "ikigai-8e493.firebaseapp.com",
//   projectId: "ikigai-8e493",
//   storageBucket: "ikigai-8e493.firebasestorage.app",
//   messagingSenderId: "816975772924",
//   appId: "1:816975772924:web:2d86061bff4f92b49a6b79",
//   measurementId: "G-XQSDFHYELE"
// };