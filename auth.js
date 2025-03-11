import { supabase } from "./supabase.js";

// Show alert messages on the page
function showAlert(message, type = "error") {
    alert(`${type.toUpperCase()}: ${message}`);
}

// ✅ User Sign-Up with Email Verification
export async function signup(name, email, password) {
    try {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        // Store user in database
        await supabase.from("users").insert([{ id: data.user.id, name, email }]);

        showAlert("Sign-up successful! Please check your email to verify your account.", "success");
        window.location.href = "verify.html";
    } catch (error) {
        showAlert("Sign-up failed: " + error.message);
    }
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

// ✅ Logout Function
export async function logout() {
    await supabase.auth.signOut();
    showAlert("You have been logged out.", "success");
    setTimeout(() => window.location.href = "index.html", 1000);
}

// ✅ Check Authentication Status
supabase.auth.onAuthStateChange((event, session) => {
    if (!session) {
        window.location.href = "login.html";
    }
});
