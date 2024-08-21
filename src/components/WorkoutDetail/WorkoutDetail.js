import React from 'react';
import './WorkoutDetail.css';
import { useParams } from 'react-router-dom';

const WorkoutDetail = ({ workouts }) => {
    const { id } = useParams();
    const workout = workouts[id];

    return workout ? (
        <div className="detail-container">
            <h2>Entrenamiento {parseInt(id) + 1}</h2>
            <p><strong>Objetivo:</strong> {workout.objetivo}</p>
            <p><strong>Duración:</strong> {workout.duracion_rutina}</p>
            <h3>Rutina de Ejercicios</h3>
            {workout.rutina_de_ejercicios.map((dia, index) => (
                <div key={index}>
                    <h4>{dia.dia}: {dia.grupo_muscular}</h4>
                    <table className="workout-table">
                        <thead>
                            <tr>
                                <th>Ejercicio</th>
                                <th>Series</th>
                                <th>Repeticiones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dia.ejercicios.map((ejercicio, idx) => (
                                <tr key={idx}>
                                    <td>{ejercicio.nombre}</td>
                                    <td>{ejercicio.series}</td>
                                    <td>{ejercicio.repeticiones}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
            <p className="comments"><strong>Comentarios:</strong> {workout.comentarios}</p>
        </div>
    ) : (
        <p className="detail-container">Entrenamiento no encontrado.</p>
    );
};

export default WorkoutDetail;


