import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyhuOEdwIZUeNDGsrPni73F6artby7cV8",
  authDomain: "product-catalog-3a42e.firebaseapp.com",
  projectId: "product-catalog-3a42e",
  storageBucket: "product-catalog-3a42e.appspot.com",
  messagingSenderId: "316172061763",
  appId: "1:316172061763:web:4e5e30db657a7430b298f6",
  measurementId: "G-G15DJTCS39"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);