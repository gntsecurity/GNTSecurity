import React from "react";
import ScreenList from "../components/ScreenList";
import "../public/css/screens.css";

const Screens = () => {
    return (
        <div className="screens-page">
            <h1>Remote Screen Management</h1>
            <ScreenList />
        </div>
    );
};

export default Screens;
