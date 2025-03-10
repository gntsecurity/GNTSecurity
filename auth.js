import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// ✅ Your Firebase Config
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
const auth = getAuth();
const db = getFirestore(app);

// ✅ Sign Up Function (Stores Data in Firestore)
export async function signup(name, email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            uid: user.uid,
            createdAt: new Date()
        });

        alert("Signup successful!");
    } catch (error) {
        alert("Error: " + error.message);
    }
}

// ✅ Login Function
export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        alert("Login failed: " + error.message);
    }
}

// ✅ Password Reset (Email OTP)
export function resetPassword(email) {
    sendPasswordResetEmail(auth, email)
        .then(() => alert("Password reset email sent!"))
        .catch((error) => alert("Error: " + error.message));
}

// ✅ Logout Function
export function logout() {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    }).catch((error) => alert("Error logging out: " + error.message));
}
