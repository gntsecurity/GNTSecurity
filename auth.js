import { supabase } from "./supabase.js";

// Show alert messages
function showAlert(message, type = "error") {
    alert(`${type.toUpperCase()}: ${message}`);
}

// ✅ User Login with Debugging
export async function login(email, password) {
    console.log("Login function called");
    console.log("Email:", email);
    console.log("Password:", password ? "Entered" : "Not Entered");

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        console.log("Supabase Response:", data, error);

        if (error) {
            console.error("Login Error:", error);
            throw error;
        }

        showAlert("Login successful! Redirecting...", "success");
        setTimeout(() => window.location.href = "dashboard.html", 1500);
    } catch (error) {
        showAlert("Login failed: " + error.message);
    }
}

// ✅ FIXED: User Sign-Up with Delay Before Redirecting
export async function signup(name, email, password) {
    console.log("Signup function called");

    try {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        console.log("Signup successful:", data);

        await supabase.from("users").insert([{ id: data.user.id, name, email }]);

        showAlert("Sign-up successful! Redirecting to login in 3 seconds...", "success");

        // ✅ FIX: Add a delay to prevent login page from breaking
        setTimeout(() => {
            window.location.href = "login.html";
        }, 3000);
    } catch (error) {
        showAlert("Sign-up failed: " + error.message);
    }
}

// ✅ Google Sign-In
export async function googleSignIn() {
    console.log("Google Sign-in function called");

    try {
        const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
        if (error) throw error;
    } catch (error) {
        showAlert("Google Sign-in failed: " + error.message);
    }
}

// ✅ Password Reset
export async function resetPassword(email) {
    console.log("Reset password function called");

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
    console.log("Logout function called");
    
    await supabase.auth.signOut();
    showAlert("You have been logged out.", "success");
    setTimeout(() => window.location.href = "index.html", 1000);
}

// ✅ Fix: Only Redirect if Not Already on Login Page
supabase.auth.onAuthStateChange((event, session) => {
    console.log("Auth state changed:", event, session);

    if (!session && !window.location.pathname.includes("login.html")) {
        window.location.href = "login.html";
    }
});
