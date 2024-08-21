// WorkoutList.js
import React from 'react';
import { Link } from 'react-router-dom';
import './WorkoutList.css';

const WorkoutList = ({ workouts }) => {
    return (
        <div className="list-container">
            <h2>Lista de Entrenamientos</h2>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Objetivo</th>
                        <th>Duración</th>
                        <th>Ver Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    {workouts.map((workout, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{workout.objetivo}</td>
                            <td>{workout.duracion_rutina}</td>
                            <td>
                                <Link to={`/workouts/${index}`} className="detail-link">Ver</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WorkoutList;
