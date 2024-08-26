import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { Contact } from '../Contact/Contact.js';

const Home = () => {
    const navigate = useNavigate();
    const featureRefs = useRef([]);

    const handleStartNow = () => {
        navigate('/dashboard');
    };

    useEffect(() => {
        const handleScroll = () => {
            featureRefs.current.forEach((ref, index) => {
                if (ref) {
                    const rect = ref.getBoundingClientRect();
                    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                        ref.classList.add('slide-up');
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Trigger on mount to check visibility

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="home-container">
            <section className='sec imgp'>
                <header className="home-header">
                    <h1>AI<br />Fitness & Nutrition</h1>
                    <p>Start your path to a healthier lifestyle with personalized workouts, nutrition plans, and progress tracking.</p>
                    <button className="cta-button" onClick={handleStartNow}>
                        Get Started Today
                    </button>
                </header>
            </section>
            <section className="features sec">
                {['Personalized Workouts', 'Custom Diet Plans', 'Track Your Progress'].map((title, index) => (
                    <div
                        key={index}
                        className="feature hidden"
                        ref={el => featureRefs.current[index] = el}
                    >
                        <h2>{title}</h2>
                        <p>{index === 0 ? 'Get workout plans tailored to your goals and fitness level.' :
                            index === 1 ? 'Receive diet plans based on your needs and dietary preferences.' :
                            'Monitor your progress and stay motivated with our tracking tools.'}
                        </p>
                    </div>
                ))}
            </section>
            <Contact />
        </div>
    );
};

export default Home;
