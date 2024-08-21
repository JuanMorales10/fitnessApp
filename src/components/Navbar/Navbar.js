import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ toggleSidebar, userName }) => {
    return (
        <nav className="navbar">
            <h1>
                <Link to="/" className="home-link">My Fitness Progress</Link>
            </h1>
            <button className="hamburger" onClick={toggleSidebar}>
                &#9776;
            </button>
            <div className="nav-links">
                <span className="nav-link">{userName}</span>
            </div>
        </nav>
    );
};

export default Navbar;

