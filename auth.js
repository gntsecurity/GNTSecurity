// Import Firebase Authentication functions
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4zXJoJ7mKDH76UGA3M-GJdIdBXzA0NGE",
  authDomain: "gnts-signage.firebaseapp.com",
  projectId: "gnts-signage",
  storageBucket: "gnts-signage.firebasestorage.app",
  messagingSenderId: "117862287805",
  appId: "1:117862287805:web:a6f1aba399f18477efead4",
  measurementId: "G-4LX609RBRD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to handle user signup
export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      return userCredential.user;
    })
    .catch(error => {
      console.error("Error signing up:", error.message);
      throw error;
    });
}

// Function to handle user login
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      return userCredential.user;
    })
    .catch(error => {
      console.error("Error logging in:", error.message);
      throw error;
    });
}

// Function to handle user logout
export function logout() {
  return signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch(error => {
      console.error("Error signing out:", error.message);
    });
}

// Function to check user authentication state
export function checkAuth(callback) {
  onAuthStateChanged(auth, user => {
    callback(user);
  });
}