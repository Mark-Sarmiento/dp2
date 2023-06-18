// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getDatabase } from 'firebase/database';




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtJczSKdYoa8WxsgwD0CI1KpId9tUcsyY",
  authDomain: "nutriculture-8657d.firebaseapp.com",
  databaseURL:"https://nutriculture-8657d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nutriculture-8657d",
  storageBucket: "nutriculture-8657d.appspot.com",
  messagingSenderId: "593393233117",
  appId: "1:593393233117:web:cbcde8e66b42cc76a23f34",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
