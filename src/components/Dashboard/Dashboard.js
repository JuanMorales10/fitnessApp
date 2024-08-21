import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Timer from '../Timer/Timer';

const Dashboard = () => {
    const [userProfile, setUserProfile] = useState({});
    const [workouts, setWorkouts] = useState([]);
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const profileData = JSON.parse(localStorage.getItem('userProfile'));
        const workoutData = JSON.parse(localStorage.getItem('workouts'));
        const mealData = JSON.parse(localStorage.getItem('meals'));

        setUserProfile(profileData || {});
        setWorkouts(workoutData || []);
        setMeals(mealData || []);
    }, []);

    const latestWorkout = workouts[workouts.length - 1];
    const latestMeal = meals[meals.length - 1];

    return (
        <div className="dashboard">
            <div className="card profile">
                <h2>Hola, {userProfile.nombre}!</h2>
                <p>Objetivo: {userProfile.objetivo}</p>
            </div>

            <div className="card metabolic-rate">
                <h2>Tasa Metabólica</h2>
                <p>{calculateMetabolicRate(userProfile)} kcal/día</p>
            </div>

            <div className="card latest-workout">
                <h2>Último Entrenamiento</h2>
                {latestWorkout ? (
                    <div>
                        <p><strong>Objetivo:</strong> {latestWorkout.objetivo}</p>
                        <p><strong>Duración:</strong> {latestWorkout.duracion_rutina}</p>
                        <Link to={`/workouts/${workouts.length - 1}`}>Ver Detalles</Link>
                    </div>
                ) : (
                    <p>No hay entrenamientos generados.</p>
                )}
            </div>

            <div className="card latest-meal">
                <h2>Última Comida</h2>
                {latestMeal ? (
                    <div>
                        <p><strong>Objetivo:</strong> {latestMeal.objetivo}</p>
                        <p><strong>Calorías Totales:</strong> {extractMealCalories(latestMeal)}</p>
                        <Link to={`/meals/${meals.length - 1}`}>Ver Detalles</Link>
                    </div>
                ) : (
                    <p>No hay comidas generadas.</p>
                )}
            </div>

            <div className="card workout-list">
                <h2>Lista de Entrenamientos</h2>
                <Link to="/workouts" className="detail-link">Ver Lista Completa</Link>
            </div>

            <div className="card meal-list">
                <h2>Lista de Comidas</h2>
                <Link to="/meals" className="detail-link">Ver Lista Completa</Link>
            </div>

            <div className="card timer-link">
                <h2>Workout Timer</h2>
                <Link to="/timer" className="detail-link">Start Timer</Link>
            </div>


        </div>
    );
};

const calculateMetabolicRate = (profile) => {
    if (!profile.peso || !profile.altura || !profile.edad || !profile.genero) return 'N/A';
    const weight = parseFloat(profile.peso);
    const height = parseFloat(profile.altura);
    const age = parseInt(profile.edad);
    const isMale = profile.genero === 'hombre';

    const metabolicRate = isMale
        ? 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)
        : 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);

    return Math.round(metabolicRate);  // Redondeo del valor
};


const extractMealCalories = (meal) => {
    // Sumar las calorías de todos los alimentos en el plan de comidas
    return meal.plan_de_comidas.reduce((total, comida) => {
        return total + comida.alimentos.reduce((subTotal, alimento) => subTotal + alimento.calorias, 0);
    }, 0);
};

export default Dashboard;
