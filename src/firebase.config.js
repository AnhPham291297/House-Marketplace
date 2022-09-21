import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWcVmrgrSnxY7geZ3GGjKK45KsPEGlXnU",
  authDomain: "house-market-app-13d74.firebaseapp.com",
  projectId: "house-market-app-13d74",
  storageBucket: "house-market-app-13d74.appspot.com",
  messagingSenderId: "543902484764",
  appId: "1:543902484764:web:22d98112ea89dcfc7b52d9",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
