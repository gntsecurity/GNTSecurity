// Import Firebase Authentication functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4zXJoJ7mKDH76UGA3M-GJdIdBXzA0NGE",
  authDomain: "gnts-signage.firebaseapp.com",
  projectId: "gnts-signage",
  storageBucket: "gnts-signage.appspot.com",
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
    .then(userCredential => userCredential.user)
    .catch(error => {
      console.error("Signup Error:", error.message);
      throw error;
    });
}

// Function to handle user login
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => userCredential.user)
    .catch(error => {
      console.error("Login Error:", error.message);
      throw error;
    });
}

// Function to handle user logout
export function logout() {
  return signOut(auth)
    .then(() => console.log("User signed out"))
    .catch(error => console.error("Logout Error:", error.message));
}

// Function to check authentication status
export function checkAuth(callback) {
  onAuthStateChanged(auth, user => callback(user));
}
