// import React from 'react';
// import './Home.css';
// import img1 from '../../assets/img/pexels-koolshooters-8520589.avif'


// const Home = () => (
//     <div className="home-container">
//         <header className="home-header">
//             <h1>Bienvenido a la Aplicación de Fitness</h1>
//             <p>Tu viaje hacia una vida más saludable comienza aquí. Descubre nuestras funciones, entrenamientos personalizados y planes de dieta.</p>
//         </header>
//         <section className="features">
//             <div className="feature">
//                 <div className="feature-icon" >
//                 </div>
//                 <h2>Entrenamientos Personalizados</h2>
//                 <p>Obtén planes de entrenamiento adaptados a tus objetivos y nivel de condición física.</p>
//             </div>
//             <div className="feature">
//                 <div className="feature-icon">
                   
//                 </div>
//                 <h2>Planes de Dieta Personalizados</h2>
//                 <p>Recibe planes de dieta basados en tus necesidades y preferencias alimenticias.</p>
//             </div>
//             <div className="feature">
//                 <div className="feature-icon">
                   
//                 </div>
//                 <h2>Monitorea tu Progreso</h2>
//                 <p>Monitorea tu progreso y mantente motivado con nuestras herramientas de seguimiento.</p>
//             </div>
//         </section>
//         <section className="cta-section">
//             <button className="cta-button">Comienza Hoy</button>
//         </section>
//     </div>
// );

// export default Home;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleStartNow = () => {
        navigate('/dashboard'); // Redirige al Dashboard
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Bienvenido a la Aplicación de Fitness</h1>
                <p>Tu viaje hacia una vida más saludable comienza aquí. Descubre nuestras funciones, entrenamientos personalizados y planes de dieta.</p>
            </header>
            <section className="features">
                <div className="feature">
                    <div className="feature-icon">
                        {/* Puedes agregar aquí una imagen o un icono */}
                    </div>
                    <h2>Entrenamientos Personalizados</h2>
                    <p>Obtén planes de entrenamiento adaptados a tus objetivos y nivel de condición física.</p>
                </div>
                <div className="feature">
                    <div className="feature-icon">
                        {/* Puedes agregar aquí una imagen o un icono */}
                    </div>
                    <h2>Planes de Dieta Personalizados</h2>
                    <p>Recibe planes de dieta basados en tus necesidades y preferencias alimenticias.</p>
                </div>
                <div className="feature">
                    <div className="feature-icon">
                        {/* Puedes agregar aquí una imagen o un icono */}
                    </div>
                    <h2>Monitorea tu Progreso</h2>
                    <p>Monitorea tu progreso y mantente motivado con nuestras herramientas de seguimiento.</p>
                </div>
            </section>
            <section className="cta-section">
                <button className="cta-button" onClick={handleStartNow}>
                    Comienza Hoy
                </button>
            </section>
        </div>
    );
};

export default Home;
