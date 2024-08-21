// import React from 'react';
// import './MealDetail.css';
// import { useParams } from 'react-router-dom';

// const MealDetail = ({ meals }) => {
//     const { id } = useParams();
//     const meal = meals[id];

//     return meal ? (
//         <div className="detail-container">
//             <h2>Comida {parseInt(id) + 1}</h2>
//             <p><strong>Objetivo:</strong> {meal.objetivo}</p>
//             <p><strong>Calorías Totales:</strong> {meal.TDEE}</p>
//             <h3>Plan de Comidas</h3>
//             {meal.plan_de_comidas.map((comida, index) => (
//                 <div key={index}>
//                     <h4>{comida.comida}</h4>
//                     <table className="meal-table">
//                         <thead>
//                             <tr>
//                                 <th>Alimento</th>
//                                 <th>Cantidad</th>
//                                 <th>Calorías</th>
//                                 <th>Proteínas (g)</th>
//                                 <th>Carbohidratos (g)</th>
//                                 <th>Grasas (g)</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {comida.alimentos.map((alimento, idx) => (
//                                 <tr key={idx}>
//                                     <td>{alimento.nombre}</td>
//                                     <td>{alimento.cantidad}</td>
//                                     <td>{alimento.calorias}</td>
//                                     <td>{alimento.proteinas}</td>
//                                     <td>{alimento.carbohidratos}</td>
//                                     <td>{alimento.grasas}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ))}
//         </div>
//     ) : (
//         <p className="detail-container">Comida no encontrada.</p>
//     );
// };

// export default MealDetail;

import React from 'react';
import './MealDetail.css';
import { useParams } from 'react-router-dom';

const MealDetail = ({ meals }) => {
    const { id } = useParams();
    const meal = meals[id];

    return meal ? (
        <div className="detail-container">
            <h2>Comida {parseInt(id) + 1}</h2>
            <p><strong>Objetivo:</strong> {meal.objetivo}</p>
            <p><strong>Calorías Totales:</strong> {meal.TDEE}</p>
            <h3>Plan de Comidas</h3>
            {meal.plan_de_comidas.map((comida, index) => (
                <div key={index}>
                    <h4>{comida.comida}</h4>
                    <div className="meal-table-container">
                        <table className="meal-table">
                            <thead>
                                <tr>
                                    <th>Alimento</th>
                                    <th>Cantidad</th>
                                    <th>Calorías</th>
                                    <th>Proteínas (g)</th>
                                    <th>Carbohidratos (g)</th>
                                    <th>Grasas (g)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comida.alimentos.map((alimento, idx) => (
                                    <tr key={idx}>
                                        <td data-label="Alimento">{alimento.nombre}</td>
                                        <td data-label="Cantidad">{alimento.cantidad}</td>
                                        <td data-label="Calorías">{alimento.calorias}</td>
                                        <td data-label="Proteínas (g)">{alimento.proteinas}</td>
                                        <td data-label="Carbohidratos (g)">{alimento.carbohidratos}</td>
                                        <td data-label="Grasas (g)">{alimento.grasas}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <p className="detail-container">Comida no encontrada.</p>
    );
};

export default MealDetail;


