

// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './Sidebar.css';

// const Sidebar = ({ openModal, isOpen, toggleSidebar }) => {
//     const checkUserProfile = () => {
//         const userProfile = JSON.parse(localStorage.getItem('userProfile'));
//         if (!userProfile || !userProfile.nombre || !userProfile.edad || !userProfile.peso || !userProfile.altura || !userProfile.genero || !userProfile.frecuencia || !userProfile.objetivo) {
//             openModal();
//         } else {
//             return true;
//         }
//     };

//     useEffect(() => {
//         if (isOpen) {
//             const timer = setTimeout(() => {
//                 toggleSidebar();
//             }, 5000); // Sidebar se cierra automáticamente después de 5 segundos

//             return () => clearTimeout(timer); // Limpiar el timer si el sidebar se cierra antes
//         }
//     }, [isOpen, toggleSidebar]);

//     const handleLinkClick = () => {
//         toggleSidebar(); // Cerrar el sidebar al hacer clic en cualquier opción
//     };

//     return (
//         <div className={`sidebar ${isOpen ? 'open' : ''}`}>
//             <Link to="/dashboard" className="sidebar-link" onClick={handleLinkClick}>Dashboard</Link>
//             <Link to="/create-workout" className="sidebar-link" onClick={handleLinkClick}>Crear Rutina</Link>
//             <Link to="/create-meal" className="sidebar-link" onClick={handleLinkClick}>Crear Comida</Link>
//             <button onClick={() => { openModal(); handleLinkClick(); }} className="sidebar-link">Modificar Perfil</button>
//         </div>
//     );
// };

// export default Sidebar;

import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { FaDumbbell, FaUtensils, FaUserEdit, FaChartLine } from 'react-icons/fa'; 


const Sidebar = ({ openModal, isOpen, toggleSidebar }) => {
    const handleLinkClick = () => {
        toggleSidebar(); // Cierra el sidebar al hacer clic en un enlace
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <Link to="/dashboard" className="sidebar-link" onClick={handleLinkClick}>Dashboard <FaChartLine className="nav-link-icon" /></Link>
            <Link to="/create-workout" className="sidebar-link" onClick={handleLinkClick}>Crear Rutina   <FaDumbbell className="nav-link-icon" /></Link>
            <Link to="/create-meal" className="sidebar-link" onClick={handleLinkClick}>Crear Comida  <FaUtensils className="nav-link-icon" /></Link>
            <button onClick={() => { openModal(); handleLinkClick(); }} className="sidebar-link">Modificar Perfil <FaUserEdit className="nav-link-icon" /></button>
        </div>
    );
};

export default Sidebar;
