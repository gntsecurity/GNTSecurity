import { supabase } from "./supabase.js";

// Show alert messages
function showAlert(message, type = "error") {
    alert(`${type.toUpperCase()}: ${message}`);
}

// ✅ Improved User Login
export async function login(email, password) {
    console.log("Login function called");

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        console.log("Login successful:", data);
        window.location.href = "dashboard.html";
    } catch (error) {
        showAlert("Login failed: " + error.message);
    }
}

// ✅ Improved Sign-Up with OTP Verification
export async function signup(name, email, password) {
    console.log("Signup function called");

    try {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        console.log("Signup successful:", data);
        await supabase.from("users").insert([{ id: data.user.id, name, email }]);

        showAlert("Sign-up successful! Check your email for verification.", "success");
        window.location.href = "verify.html";
    } catch (error) {
        showAlert("Sign-up failed: " + error.message);
    }
}

// ✅ OTP Verification
export async function verifyOTP(otp) {
    try {
        const { error } = await supabase.auth.verifyOtp({
            email: supabase.auth.user().email,
            token: otp,
            type: "email"
        });
        if (error) throw error;

        showAlert("Verification successful! Redirecting to login...", "success");
        window.location.href = "login.html";
    } catch (error) {
        showAlert("Verification failed: " + error.message);
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
    showAlert("Logged out successfully.", "success");
    window.location.href = "index.html";
}

// ✅ Auth State Change Handling (Fixed Redirect Issues)
supabase.auth.onAuthStateChange((event, session) => {
    console.log("Auth state changed:", event, session);

    const currentPage = window.location.pathname;

    // ✅ Allow users to access login, sign-up, and verify pages without redirection
    const allowedPages = ["/login.html", "/signup.html", "/verify.html", "/forgot-password.html"];

    if (!session && !allowedPages.includes(currentPage)) {
        window.location.href = "login.html";
    }

    // ✅ Redirect signed-in users away from login/signup pages
    if (session && allowedPages.includes(currentPage)) {
        window.location.href = "dashboard.html";
    }
});
