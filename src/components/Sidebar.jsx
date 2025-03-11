import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../utils/auth";
import "../public/css/dashboard.css";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate("/");
    };

    return (
        <aside className="sidebar">
            <h2>GNTS Signage</h2>
            <nav>
                <ul>
                    <li onClick={() => navigate("/dashboard")}>📺 Screens</li>
                    <li onClick={() => navigate("/content")}>📂 Content</li>
                    <li onClick={() => navigate("/settings")}>⚙️ Settings</li>
                    <li onClick={handleLogout}>🚪 Logout</li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
