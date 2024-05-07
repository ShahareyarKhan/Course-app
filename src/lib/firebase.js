import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiR_ohzwGGO1Tmd_QijwVr_B-79MXeHmw",
  authDomain: "contact-page-69807.firebaseapp.com",
  projectId: "contact-page-69807",
  storageBucket: "contact-page-69807.appspot.com",
  messagingSenderId: "705050704454",
  appId: "1:705050704454:web:966e094f28bd03e6126847"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {app, auth, db};