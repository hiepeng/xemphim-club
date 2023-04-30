// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8oVVDDYFHlykchzrc24LEKRGge2flViE",
  authDomain: "webxemphim-5e72d.firebaseapp.com",
  projectId: "webxemphim-5e72d",
  storageBucket: "webxemphim-5e72d.appspot.com",
  messagingSenderId: "489384108576",
  appId: "1:489384108576:web:0acc41fa1935b92b6e1245",
  measurementId: "G-49L0XY2Z3N"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);