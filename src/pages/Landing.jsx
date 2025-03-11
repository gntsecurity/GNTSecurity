import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../public/css/landing.css";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            <header className="landing-header">
                <h1>GNTS Signage</h1>
                <div>
                    <button className="btn" onClick={() => navigate('/login')}>Login</button>
                    <button className="btn primary" onClick={() => navigate('/signup')}>Get Started</button>
                </div>
            </header>

            <section className="hero">
                <h2>Modern Digital Signage, Simplified.</h2>
                <p>Control your screens effortlessly from anywhere.</p>
                <button className="cta-btn" onClick={() => navigate('/dashboard')}>Explore Dashboard</button>
            </section>

            <section className="features">
                <div className="feature">
                    <h3>📡 Cloud-Powered</h3>
                    <p>Manage content remotely with zero hassle.</p>
                </div>
                <div className="feature">
                    <h3>🚀 Instant Updates</h3>
                    <p>Deploy content across screens in real time.</p>
                </div>
                <div className="feature">
                    <h3>🔒 Secure & Scalable</h3>
                    <p>Enterprise-grade security with full control.</p>
                </div>
            </section>

            <footer>
                <p>© 2025 GNTS Signage. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Landing;
