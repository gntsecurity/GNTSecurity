export async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("https://gnts-signage.b-cdn.net/upload", {
        method: "POST",
        body: formData,
        headers: { "Access-Control-Allow-Origin": "*" }
    });

    if (!response.ok) throw new Error("Failed to upload");
    const data = await response.json();
    return data.url;
}
