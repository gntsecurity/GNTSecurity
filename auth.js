import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// ✅ Firebase Config
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
const auth = getAuth();
const db = getFirestore();
const googleProvider = new GoogleAuthProvider();

// ✅ Google Sign-In
export async function googleSignIn() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Store user in Firestore if not already stored
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
            await setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                email: user.email,
                uid: user.uid,
                createdAt: new Date()
            });
        }

        window.location.href = "dashboard.html";
    } catch (error) {
        console.error(error.message);
    }
}

// ✅ Email Signup
export async function signup(name, email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            uid: user.uid,
            createdAt: new Date()
        });

        window.location.href = "dashboard.html";
    } catch (error) {
        console.error(error.message);
    }
}

// ✅ Email Login
export async function login(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error(error.message);
    }
}

// ✅ Password Reset
export function resetPassword(email) {
    sendPasswordResetEmail(auth, email)
        .then(() => alert("Password reset email sent."))
        .catch((error) => console.error(error.message));
}

// ✅ Logout
export function logout() {
    signOut(auth).then(() => window.location.href = "login.html");
}
