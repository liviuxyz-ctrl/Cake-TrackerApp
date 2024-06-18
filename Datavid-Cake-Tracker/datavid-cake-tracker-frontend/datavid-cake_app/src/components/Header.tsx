// src/components/Header.tsx
import '../styles/components/Header.scss';

import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="app-header">
            <h1>Datavid Cake Tracker</h1>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/edit-member">Edit Member</Link></li>
                    <li><Link to="/calendar">Calendar</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                    <li><Link to="/temp">Temp Menu</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
