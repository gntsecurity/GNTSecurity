import { supabase } from "./supabase.js";

// User Sign Up
export async function signup(name, email, password) {
    try {
        const { user, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        
        // Store user data in the database
        await supabase.from("users").insert([{ id: user.id, name, email }]);
        
        alert("Sign-up successful! Please check your email to verify your account.");
        window.location.href = "verify.html";
    } catch (error) {
        alert("Sign-up failed: " + error.message);
    }
}

// User Login
export async function login(email, password) {
    try {
        const { user, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        window.location.href = "dashboard.html";
    } catch (error) {
        alert("Login failed: " + error.message);
    }
}

// Google Sign-In
export async function googleSignIn() {
    try {
        const { user, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
        if (error) throw error;
    } catch (error) {
        alert("Google Sign-in failed: " + error.message);
    }
}

// Password Reset
export async function resetPassword(email) {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        alert("Password reset email sent. Check your inbox.");
    } catch (error) {
        alert("Password reset failed: " + error.message);
    }
}

// Logout Function
export async function logout() {
    await supabase.auth.signOut();
    window.location.href = "index.html";
}

// Check Authentication Status
supabase.auth.onAuthStateChange((event, session) => {
    if (!session) {
        window.location.href = "login.html";
    }
});
