// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvLKWefgbwq5vEvZm_bv4QiFn_jHgsUKg",
  authDomain: "burj-al-arab-4e938.firebaseapp.com",
  projectId: "burj-al-arab-4e938",
  storageBucket: "burj-al-arab-4e938.appspot.com",
  messagingSenderId: "948287620021",
  appId: "1:948287620021:web:72d6dd0ce4d508e9b70ffc"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;