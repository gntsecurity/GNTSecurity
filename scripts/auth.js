// Import Supabase
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://hneunaxqlnbhwcqxjwly.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log("Supabase Initialized:", supabase);

document.addEventListener("DOMContentLoaded", function () {
    // Handle Login
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            console.log("Login Attempted");

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });

                if (error) {
                    console.error("Login Error:", error.message);
                    alert("Login failed: " + error.message);
                    return;
                }

                console.log("Login Successful:", data);
                alert("Login successful!");
                localStorage.setItem("supabase_session", JSON.stringify(data.session));
                window.location.href = "dashboard.html";  // Redirect to Dashboard
            } catch (err) {
                console.error("Unexpected Error:", err);
                alert("An unexpected error occurred.");
            }
        });
    }

    // Handle Signup
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            console.log("Signup Attempted");

            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;

            try {
                const { data, error } = await supabase.auth.signUp({ email, password });

                if (error) {
                    console.error("Signup Error:", error.message);
                    alert("Signup failed: " + error.message);
                    return;
                }

                console.log("Signup Successful:", data);
                alert("Signup successful! Please log in.");
                window.location.href = "index.html";  // Redirect to Login Page
            } catch (err) {
                console.error("Unexpected Error:", err);
                alert("An unexpected error occurred.");
            }
        });
    }

    // Handle Logout
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            await supabase.auth.signOut();
            localStorage.removeItem("supabase_session");
            window.location.href = "index.html";  // Redirect to login
        });
    }

    // Protect Dashboard (Redirect if Not Logged In)
    if (window.location.pathname.includes("dashboard.html")) {
        const session = JSON.parse(localStorage.getItem("supabase_session"));
        if (!session) {
            console.warn("User is not logged in. Redirecting to login...");
            window.location.href = "index.html"; // Redirect to login
        }
    }
});
