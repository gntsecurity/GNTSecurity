import React, { useEffect, useState } from "react";
import { fetchScreens, assignContentToScreen } from "../utils/db";
import UploadForm from "./UploadForm";
import ScreenTile from "./ScreenTile";

const ScreenList = () => {
    const [screens, setScreens] = useState([]);

    useEffect(() => {
        async function loadScreens() {
            const data = await fetchScreens();
            setScreens(data);
        }
        loadScreens();
    }, []);

    const handleUploadComplete = async (url, screenId) => {
        await assignContentToScreen(screenId, url);
        setScreens((prevScreens) =>
            prevScreens.map((s) => (s.id === screenId ? { ...s, content_url: url } : s))
        );
    };

    return (
        <div className="screen-list">
            <h2>Manage Screens</h2>
            {screens.map((screen) => (
                <div key={screen.id} className="screen-item">
                    <ScreenTile screen={screen} />
                    <UploadForm onUploadComplete={(url) => handleUploadComplete(url, screen.id)} />
                </div>
            ))}
        </div>
    );
};

export default ScreenList;
