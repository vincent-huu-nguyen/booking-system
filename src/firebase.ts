import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-YE_kXk6YVpeXekt2qWHtebrGYsM1k7A",
  authDomain: "booking-system-c1216.firebaseapp.com",
  projectId: "booking-system-c1216",
  storageBucket: "booking-system-c1216.firebasestorage.app",
  messagingSenderId: "236948518309",
  appId: "1:236948518309:web:d4178cf0b7fa3682f3644c",
  measurementId: "G-N3XWEBFDDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
