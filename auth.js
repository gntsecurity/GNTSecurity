import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export async function signup(name, email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCredential.user.uid), { name, email });
    window.location.href = "dashboard.html";
}

export async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
}

export async function googleSignIn() {
    const result = await signInWithPopup(auth, provider);
    const userRef = doc(db, "users", result.user.uid);
    if (!(await getDoc(userRef)).exists()) {
        await setDoc(userRef, { name: result.user.displayName, email: result.user.email });
    }
    window.location.href = "dashboard.html";
}

export async function logout() {
    await signOut(auth);
    window.location.href = "login.html";
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        localStorage.setItem("userUID", user.uid);
    } else {
        localStorage.removeItem("userUID");
    }
});
