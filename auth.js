import { supabase } from "./supabase.js";

// ✅ Redirect to error or success pages instead of pop-ups
function redirectToPage(page) {
    window.location.href = `${page}.html`;
}

// ✅ LOGIN FUNCTION (Redirects on Failure)
export async function login(email, password) {
    try {
        console.log("Logging in...");
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            console.error("Login error:", error.message);
            redirectToPage("login-failed");
            return;
        }

        console.log("Login successful:", data);
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error("Unexpected login error:", error);
        redirectToPage("error");
    }
}

// ✅ SIGNUP FUNCTION (Redirects on Success or Failure)
export async function signup(name, email, password) {
    try {
        console.log("Signing up...");
        
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            console.error("Signup error:", error.message);
            redirectToPage("signup-failed");
            return;
        }

        console.log("Signup successful:", data);

        // Store user name in Supabase DB
        if (data.user) {
            await supabase.from("users").insert([{ id: data.user.id, name, email }]);
        }

        redirectToPage("signup-success");
    } catch (error) {
        console.error("Unexpected signup error:", error);
        redirectToPage("error");
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

// ✅ AUTH STATE HANDLING (Prevents Infinite Redirect Loop)
supabase.auth.onAuthStateChange(async (event, session) => {
    console.log("Auth event:", event);
    console.log("Session:", session);

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
