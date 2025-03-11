import { createClient } from '@supabase/supabase-js';

// ✅ Supabase Credentials (Using YOUR values)
const SUPABASE_URL = "https://hneunaxqlnbhwcqxjwly.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuZXVuYXhxbG5iaHdjcXhqd2x5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NTQ5NzUsImV4cCI6MjA1NzIzMDk3NX0.2t5aQ1aOCgULgYz39IIHVR9Us05ALHJOw3dmnx5u9Hg";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
