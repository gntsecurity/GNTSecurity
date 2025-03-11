import { createClient } from "@supabase/supabase-js";

// Supabase Configuration
const supabaseUrl = "https://hneunaxqlnbhwcqxjwly.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Signup Function
export async function signUp(email, password) {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return user;
}

// Login Function
export async function signIn(email, password) {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return user;
}

// Logout Function
export async function signOut() {
    await supabase.auth.signOut();
}
