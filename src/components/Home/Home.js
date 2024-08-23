// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Home.css';

// const Home = () => {
//     const navigate = useNavigate();

//     const handleStartNow = () => {
//         navigate('/dashboard'); // Redirige al Dashboard
//     };

//     return (
//         <div className="home-container">
//             <header className="home-header">
//                 <h1>Bienvenido a la Aplicación de Fitness</h1>
//                 <p>Tu viaje hacia una vida más saludable comienza aquí. Descubre nuestras funciones, entrenamientos personalizados y planes de dieta.</p>
//             </header>
//             <section className="features">
//                 <div className="feature">
//                     <div className="feature-icon">
//                         {/* Puedes agregar aquí una imagen o un icono */}
//                     </div>
//                     <h2>Entrenamientos Personalizados</h2>
//                     <p>Obtén planes de entrenamiento adaptados a tus objetivos y nivel de condición física.</p>
//                 </div>
//                 <div className="feature">
//                     <div className="feature-icon">
//                         {/* Puedes agregar aquí una imagen o un icono */}
//                     </div>
//                     <h2>Planes de Dieta Personalizados</h2>
//                     <p>Recibe planes de dieta basados en tus necesidades y preferencias alimenticias.</p>
//                 </div>
//                 <div className="feature">
//                     <div className="feature-icon">
//                         {/* Puedes agregar aquí una imagen o un icono */}
//                     </div>
//                     <h2>Monitorea tu Progreso</h2>
//                     <p>Monitorea tu progreso y mantente motivado con nuestras herramientas de seguimiento.</p>
//                 </div>
//             </section>
//             <section className="cta-section">
//                 <button className="cta-button" onClick={handleStartNow}>
//                     Comienza Hoy
//                 </button>
//             </section>
//         </div>
//     );
// };

// export default Home;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { Contact } from '../Contact/Contact.js';
import TrackVisibility from 'react-on-screen';
import 'animate.css';

const Home = () => {
    const navigate = useNavigate();

    const handleStartNow = () => {
        navigate('/dashboard'); // Redirige al Dashboard
    };

    return (
        <div className="home-container">
            <section className=' sec imgp'>
            <TrackVisibility>
            {({ isVisible }) =>
            <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>     
            <header className="home-header ">
                <h1>AI<br></br>Fitness & Nutrition</h1>
                <p>Start your path to a healthier lifestyle with personalized workouts, nutrition plans, and progress tracking.</p>
                <button className="cta-button" onClick={handleStartNow}>
                    Get Started Today
                </button>
            </header>
                </div> }
                </TrackVisibility>   
            </section>
            <section className="features sec">
                <div className="feature">
                    
                    <h2>Personalized Workouts</h2>
                    <p>Get workout plans tailored to your goals and fitness level.</p>
                </div>
                <div className="feature">
                    
                    <h2>Custom Diet Plans</h2>
                    <p>Receive diet plans based on your needs and dietary preferences.</p>
                </div>
                <div className="feature">
                  
                    <h2>Track Your Progress</h2>
                    <p>Monitor your progress and stay motivated with our tracking tools.</p>
                </div>
            </section>
            <Contact />
        </div>
    );
};

export default Home;
