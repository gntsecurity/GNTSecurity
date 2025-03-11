import React from "react";
import Sidebar from "../components/Sidebar";
import "../public/css/dashboard.css";

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <main className="dashboard-main">
                <h1>Dashboard</h1>
                <p>Manage your screens and content below.</p>
                <div className="screen-grid">
                    <div className="screen-box">Screen 1</div>
                    <div className="screen-box">Screen 2</div>
                    <div className="screen-box">Screen 3</div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
