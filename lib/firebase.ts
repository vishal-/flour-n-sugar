// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVg09BrauH7CZWeGd6EGHg0yUVQSxUZWA",
  authDomain: "flour-n-sugar.firebaseapp.com",
  projectId: "flour-n-sugar",
  storageBucket: "flour-n-sugar.firebasestorage.app",
  messagingSenderId: "755976058353",
  appId: "1:755976058353:web:6dfbc50afbc32cef6a4050",
  measurementId: "G-7NDE6C5E4R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;