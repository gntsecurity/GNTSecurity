import React, { useState } from "react";
import { uploadFile } from "../utils/api";
import "../public/css/screens.css";

const UploadForm = ({ onUploadComplete }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        try {
            const url = await uploadFile(file);
            alert("Upload successful!");
            onUploadComplete(url);
        } catch (error) {
            alert("Upload failed: " + error.message);
        }
        setUploading(false);
    };

    return (
        <div className="upload-form">
            <h3>Upload Content</h3>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
            </button>
        </div>
    );
};

export default UploadForm;
