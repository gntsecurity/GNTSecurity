import React from "react";
import "../public/css/screens.css";

const ScreenTile = ({ screen }) => {
    return (
        <div className="screen-tile">
            <h4>{screen.name}</h4>
            <iframe src={screen.content_url} title={screen.name} className="screen-preview"></iframe>
        </div>
    );
};

export default ScreenTile;
