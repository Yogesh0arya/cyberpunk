// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs4cqF-PH_Syb2anf2vqTjSOLRBtVQy4Q",
  authDomain: "cyberpunk-22e6b.firebaseapp.com",
  projectId: "cyberpunk-22e6b",
  storageBucket: "cyberpunk-22e6b.appspot.com",
  messagingSenderId: "185497469363",
  appId: "1:185497469363:web:ca3521e599391d7c9d8bc6",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { app, db, storage, auth, provider };
