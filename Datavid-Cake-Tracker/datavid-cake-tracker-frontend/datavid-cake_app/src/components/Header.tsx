import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__logo">
                <img src="/assets/images/logo.png" alt="Datavid Cake Tracker" />
            </div>
            <nav className="header__nav">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/calendar">Calendar</Link>
                    </li>
                    <li>
                        <Link to="/edit-members">Edit Members</Link>
                    </li>
                    <li>
                        <Link to="/omni-search">Omni Search</Link>
                    </li>
                    <li>
                        <Link to="/settings">Settings</Link>
                    </li>
                    <li>
                        <Link to="/temp-menu">Temp Menu</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
