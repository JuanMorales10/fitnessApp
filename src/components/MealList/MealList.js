// MealList.js
import React from 'react';
import { Link } from 'react-router-dom';
import './MealList.css';

const MealList = ({ meals }) => {
    return (
        <div className="list-container">
            <h2>Lista de Comidas</h2>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Objetivo</th>
                        <th>Calorías Totales</th>
                        <th>Ver Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    {meals.map((meal, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{meal.objetivo}</td>
                            <td>{meal.TDEE}</td>
                            <td>
                                <Link to={`/meals/${index}`} className="detail-link">Ver</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MealList;
