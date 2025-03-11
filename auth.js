import { supabase } from "./supabase.js";

// Show alert messages
function showAlert(message, type = "error") {
    alert(`${type.toUpperCase()}: ${message}`);
}

// ✅ User Login
export async function login(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        showAlert("Login successful! Redirecting...", "success");
        setTimeout(() => window.location.href = "dashboard.html", 1500);
    } catch (error) {
        showAlert("Login failed: " + error.message);
    }
}

// ✅ User Sign-Up
export async function signup(name, email, password) {
    try {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        await supabase.from("users").insert([{ id: data.user.id, name, email }]);

        showAlert("Sign-up successful! Please check your email to verify your account.", "success");
        window.location.href = "verify.html";
    } catch (error) {
        showAlert("Sign-up failed: " + error.message);
    }
}

// ✅ Google Sign-In
export async function googleSignIn() {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
        if (error) throw error;
    } catch (error) {
        showAlert("Google Sign-in failed: " + error.message);
    }
}

// ✅ Password Reset
export async function resetPassword(email) {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;

        showAlert("Password reset email sent. Check your inbox.", "success");
    } catch (error) {
        showAlert("Password reset failed: " + error.message);
    }
}

// ✅ Logout
export async function logout() {
    await supabase.auth.signOut();
    showAlert("You have been logged out.", "success");
    setTimeout(() => window.location.href = "index.html", 1000);
}

// ✅ Fix: Only Redirect if Not Already on Login Page
supabase.auth.onAuthStateChange((event, session) => {
    if (!session && !window.location.pathname.includes("login.html")) {
        window.location.href = "login.html";
    }
});
