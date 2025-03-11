import { supabase } from "./auth";

export async function assignContentToScreen(screenId, contentUrl) {
    const { error } = await supabase
        .from("screens")
        .update({ content_url: contentUrl })
        .eq("id", screenId);

    if (error) throw error;
}

export async function fetchScreens() {
    const { data, error } = await supabase.from("screens").select("*");
    if (error) throw error;
    return data;
}
