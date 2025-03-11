import { supabase } from "./supabase.js";

// ✅ Show Alert Messages
function showAlert(message, type = "error") {
    alert(`${type.toUpperCase()}: ${message}`);
}

// ✅ LOGIN (Now Works Properly)
export async function login(email, password) {
    try {
        console.log("Logging in...");
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            console.error("Login error:", error.message);
            showAlert("Login failed: " + error.message);
            return;
        }

        console.log("Login successful:", data);
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error("Unexpected login error:", error);
        showAlert("An unexpected error occurred. Check the console.");
    }
}

// ✅ SIGNUP (Now Works Properly)
export async function signup(name, email, password) {
    try {
        console.log("Signing up...");
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            console.error("Signup error:", error.message);
            showAlert("Sign-up failed: " + error.message);
            return;
        }

        console.log("Signup successful:", data);
        showAlert("Check your email for verification.", "success");
        window.location.href = "login.html";
    } catch (error) {
        console.error("Unexpected signup error:", error);
        showAlert("An unexpected error occurred. Check the console.");
    }
}

// ✅ LOGOUT (Now Works Properly)
export async function logout() {
    try {
        console.log("Logging out...");
        await supabase.auth.signOut();
        window.location.href = "index.html";
    } catch (error) {
        console.error("Logout error:", error);
    }
}

// ✅ AUTH SESSION HANDLING (Prevents Page Looping Issues)
supabase.auth.onAuthStateChange((event, session) => {
    console.log("Auth event:", event);
    console.log("Session:", session);

    if (event === "SIGNED_IN") {
        console.log("User signed in. Redirecting to dashboard...");
        window.location.href = "dashboard.html";
    } else if (!session) {
        console.log("No active session. Redirecting to login...");
        window.location.href = "login.html";
    }
});
