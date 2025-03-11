import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
const SUPABASE_URL = 'https://hneunaxqlnbhwcqxjwly.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuZXVuYXhxbG5iaHdjcXhqd2x5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NTQ5NzUsImV4cCI6MjA1NzIzMDk3NX0.2t5aQ1aOCgULgYz39IIHVR9Us05ALHJOw3dmnx5u9Hg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// BunnyCDN Configuration
const BUNNY_CDN_URL = 'https://gnts-signage.b-cdn.net/';

export async function uploadFile(file) {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `${BUNNY_CDN_URL}${fileName}`;

    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${BUNNY_CDN_URL}${fileName}`, {
            method: 'PUT',
            body: file,
            headers: { 'Content-Type': file.type }
        });

        if (!response.ok) {
            throw new Error('File upload failed');
        }
        return filePath;
    } catch (error) {
        console.error('Upload error:', error);
        return null;
    }
}

// User Authentication
export async function signUp(email, password) {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return user;
}

export async function signIn(email, password) {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return user;
}

export async function signOut() {
    await supabase.auth.signOut();
    window.location.href = 'index.html';
}

// Fetch Content List
export async function fetchContent() {
    const { data, error } = await supabase.from('signage_content').select('*');
    if (error) console.error(error);
    return data || [];
}
