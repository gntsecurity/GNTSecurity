import { supabase } from "./supabase.js";

function showAlert(message, type = "error") {
    alert(`${type.toUpperCase()}: ${message}`);
}

// ✅ LOGIN
export async function login(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = "dashboard.html";
    } catch (error) {
        showAlert("Login failed: " + error.message);
    }
}

// ✅ SIGNUP
export async function signup(name, email, password) {
    try {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        if (data.user) {
            await supabase.from("users").insert([{ id: data.user.id, name, email }]);
        }

        showAlert("Check your email for verification.", "success");
        window.location.href = "verify.html";
    } catch (error) {
        showAlert("Sign-up failed: " + error.message);
    }
}

// ✅ PASSWORD RESET
export async function resetPassword(email) {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: "login.html" });
        if (error) throw error;
        showAlert("Password reset email sent.", "success");
    } catch (error) {
        showAlert("Password reset failed: " + error.message);
    }
}

// ✅ LOGOUT
export async function logout() {
    await supabase.auth.signOut();
    window.location.href = "index.html";
}

// ✅ AUTH STATE FIX
supabase.auth.onAuthStateChange((event, session) => {
    const currentPage = window.location.pathname;
    const allowedPages = ["/index.html", "/login.html", "/signup.html", "/verify.html", "/forgot-password.html"];

    if (!session && !allowedPages.includes(currentPage)) {
        window.location.href = "login.html";
    }

    if (session && currentPage === "/login.html") {
        window.location.href = "dashboard.html";
    }
});
