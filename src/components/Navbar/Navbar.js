// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';

// const Navbar = ({ toggleSidebar, userName }) => {
//     return (
//         <nav className="navbar">
//             <h1>
//                 <Link to="/" className="home-link">My Fitness Progress</Link>
//             </h1>
//             <button className="hamburger" onClick={toggleSidebar}>
//                 &#9776;
//             </button>
//             <div className="nav-links">
//                 <span className="nav-link">{userName}</span>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaDumbbell, FaUtensils, FaUserEdit, FaChartLine } from 'react-icons/fa'; 

const Navbar = ({ toggleSidebar, userName, openModal }) => {
    return (
        <nav className="navbar">
            <h1>
                <Link to="/" className="home-link">MFP</Link>
            </h1>
            <div className="hamburger" onClick={toggleSidebar}>
                &#9776;
            </div>
            <div className="nav-links">
                <Link to="/dashboard" className="nav-link">
                    <FaChartLine className="nav-link-icon" /> {/* Icono del Dashboard */}
                </Link>
                <Link to="/create-workout" className="nav-link">
                    <FaDumbbell className="nav-link-icon" />
                </Link>
                <Link to="/create-meal" className="nav-link">
                    <FaUtensils className="nav-link-icon" />
                </Link>
                <button onClick={openModal} className="nav-link">
                    <FaUserEdit className="nav-link-icon" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
