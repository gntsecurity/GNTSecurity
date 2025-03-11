import { supabase } from "./supabase.js";

// ✅ Show Alert Messages
function showAlert(message, type = "error") {
    alert(`${type.toUpperCase()}: ${message}`);
}

// ✅ LOGIN FUNCTION (Fixes Refresh Issue)
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
        window.location.href = "dashboard.html"; // Redirect only AFTER successful login
    } catch (error) {
        console.error("Unexpected login error:", error);
        showAlert("An unexpected error occurred. Check the console.");
    }
}

// ✅ SIGNUP FUNCTION (Now Works Properly)
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

        // Store user name in Supabase DB
        if (data.user) {
            await supabase.from("users").insert([{ id: data.user.id, name, email }]);
        }

        showAlert("Check your email for verification.", "success");
        window.location.href = "login.html"; // Redirect AFTER signup
    } catch (error) {
        console.error("Unexpected signup error:", error);
        showAlert("An unexpected error occurred. Check the console.");
    }
}

// ✅ LOGOUT FUNCTION
export async function logout() {
    try {
        console.log("Logging out...");
        await supabase.auth.signOut();
        window.location.href = "index.html";
    } catch (error) {
        console.error("Logout error:", error);
    }
}

// ✅ FIXED AUTH STATE HANDLING (Prevents Infinite Redirect Loop)
supabase.auth.onAuthStateChange(async (event, session) => {
    console.log("Auth event:", event);
    console.log("Session:", session);

    // ✅ Only redirect if on a protected page
    if (session) {
        console.log("User is signed in.");
        if (window.location.pathname.includes("login.html") || window.location.pathname.includes("signup.html")) {
            window.location.href = "dashboard.html";
        }
    } else {
        console.log("User is signed out.");
        if (window.location.pathname.includes("dashboard.html")) {
            window.location.href = "login.html";
        }
    }
});
