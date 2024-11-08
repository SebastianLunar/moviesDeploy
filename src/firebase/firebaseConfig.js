import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GOOGLE_API_KEY } from "../utils/constants";

const firebaseConfig = {
  apiKey: GOOGLE_API_KEY,
  authDomain: "cinemapp-ed67e.firebaseapp.com",
  projectId: "cinemapp-ed67e",
  storageBucket: "cinemapp-ed67e.firebasestorage.app",
  messagingSenderId: "330590542811",
  appId: "1:330590542811:web:60fa4f1c94d1dbc285e5fe"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const firestoreDB = getFirestore();

export default app;