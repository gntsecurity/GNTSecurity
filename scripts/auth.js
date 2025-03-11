// Supabase Initialization
const supabaseUrl = "https://hneunaxqlnbhwcqxjwly.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

console.log("Supabase Loaded:", supabase);

document.addEventListener("DOMContentLoaded", function () {
    // Handle Login
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const { data, error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) {
                alert("Login failed: " + error.message);
                return;
            }

            localStorage.setItem("supabase_session", JSON.stringify(data.session));
            window.location.href = "dashboard.html";
        });
    }

    // Handle Signup
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;

            const { data, error } = await supabase.auth.signUp({ email, password });

            if (error) {
                alert("Signup failed: " + error.message);
                return;
            }

            alert("Signup successful! Please log in.");
            window.location.href = "index.html";
        });
    }

    // Handle Logout
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            await supabase.auth.signOut();
            localStorage.removeItem("supabase_session");
            window.location.href = "index.html";
        });
    }

    // Protect Dashboard
    if (window.location.pathname.includes("dashboard.html")) {
        const session = JSON.parse(localStorage.getItem("supabase_session"));
        if (!session) {
            window.location.href = "index.html";
        }
    }
});
