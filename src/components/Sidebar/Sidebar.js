
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Sidebar.css';

// const Sidebar = ({ openModal, isOpen }) => {
//     const checkUserProfile = () => {
//         const userProfile = JSON.parse(localStorage.getItem('userProfile'));
//         if (!userProfile || !userProfile.nombre || !userProfile.edad || !userProfile.peso || !userProfile.altura || !userProfile.genero || !userProfile.frecuencia || !userProfile.objetivo) {
//             openModal();
//         } else {
//             return true;
//         }
//     };

//     return (
//         <div className={`sidebar ${isOpen ? 'open' : ''}`}>
//             <Link to="/dashboard" className="sidebar-link">Dashboard</Link>
//             <Link to="/create-workout" className="sidebar-link">Crear Rutina</Link>
//             <Link to="/create-meal" className="sidebar-link">Crear Comida</Link>
//             <button onClick={openModal} className="sidebar-link">Modificar Perfil</button>
//         </div>
//     );
// };

// export default Sidebar;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ openModal, isOpen, toggleSidebar }) => {
    const checkUserProfile = () => {
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        if (!userProfile || !userProfile.nombre || !userProfile.edad || !userProfile.peso || !userProfile.altura || !userProfile.genero || !userProfile.frecuencia || !userProfile.objetivo) {
            openModal();
        } else {
            return true;
        }
    };

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                toggleSidebar();
            }, 5000); // Sidebar se cierra automáticamente después de 5 segundos

            return () => clearTimeout(timer); // Limpiar el timer si el sidebar se cierra antes
        }
    }, [isOpen, toggleSidebar]);

    const handleLinkClick = () => {
        toggleSidebar(); // Cerrar el sidebar al hacer clic en cualquier opción
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <Link to="/dashboard" className="sidebar-link" onClick={handleLinkClick}>Dashboard</Link>
            <Link to="/create-workout" className="sidebar-link" onClick={handleLinkClick}>Crear Rutina</Link>
            <Link to="/create-meal" className="sidebar-link" onClick={handleLinkClick}>Crear Comida</Link>
            <button onClick={() => { openModal(); handleLinkClick(); }} className="sidebar-link">Modificar Perfil</button>
        </div>
    );
};

export default Sidebar;
