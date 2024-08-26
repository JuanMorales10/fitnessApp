// import React, { useState, useEffect } from 'react';
// import './CreateMeal.css';

// const CreateMeal = () => {
//     const [meal, setMeal] = useState(null);
//     const [userProfile, setUserProfile] = useState(null);
//     const [alimento, setAlimento] = useState('');
//     const [alimentos, setAlimentos] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         const savedData = localStorage.getItem('userProfile');
//         if (savedData) {
//             const profile = JSON.parse(savedData);
//             if (profile.nombre && profile.edad && profile.peso && profile.altura && profile.genero && profile.frecuencia && profile.objetivo) {
//                 setUserProfile(profile);
//             } else {
//                 window.location.href = '/';
//             }
//         }
//     }, []);

//     const getTMB = () => {
//         if (!userProfile) return 0;
//         const { genero, peso, altura, edad } = userProfile;
//         if (genero === 'hombre') {
//             return 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * edad);
//         } else {
//             return 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * edad);
//         }
//     };

//     const getTDEE = () => {
//         const tmb = getTMB();
//         const { frecuencia } = userProfile;
//         switch (frecuencia) {
//             case '1-2':
//                 return tmb * 1.375;
//             case '3-4':
//                 return tmb * 1.55;
//             case '5-6':
//                 return tmb * 1.725;
//             case '7':
//                 return tmb * 1.9;
//             default:
//                 return tmb * 1.2;
//         }
//     };

//     const addAlimento = () => {
//         if (alimento.trim() !== '') {
//             setAlimentos([...alimentos, alimento]);
//             setAlimento('');
//         }
//     };

//     const removeAlimento = (index) => {
//         const newAlimentos = alimentos.filter((_, i) => i !== index);
//         setAlimentos(newAlimentos);
//     };

//     const createMealPlan = async () => {
//         setIsLoading(true);
//         const tdee = getTDEE();
//         const prompt = `
//         Eres un experto en nutrición dedicado a proporcionar asesoramiento detallado y personalizado sobre planes de alimentación. Puedes crear planes de comidas equilibrados y efectivos para alcanzar objetivos de salud y fitness. Siempre enfatizas la importancia de la consistencia, el equilibrio y la personalización en cada plan. Estás aquí para ayudar a tomar decisiones informadas y motivar a mantener un estilo de vida saludable. Siempre pides información sobre datos personales, como la tasa metabólica basal y el consumo total calórico, para ajustar mejor las recomendaciones.
//         Datos del usuario: 
//           "objetivo": "${userProfile.objetivo}",
//           "TDEE": "${tdee} kcal",
//           "frecuencia_comidas": "5 comidas al día",
//           "edad": "${userProfile.edad}",
//           "peso": "${userProfile.peso}",
//           "altura": "${userProfile.altura}",
//         Por favor, devuelve la siguiente información como un objeto JSON válido que pueda ser utilizado directamente en una aplicación. La estructura JSON debe ser la siguiente:
        
//         {
//           "objetivo": "${userProfile.objetivo}",
//           "TDEE": "${tdee} kcal",
//           "frecuencia_comidas": "5 comidas al día",
//           "edad": "${userProfile.edad}",
//           "peso": "${userProfile.peso}",
//           "altura": "${userProfile.altura}",
//           "alimentos_disponibles": [${alimentos.map(alimento => `"${alimento}"`).join(', ')}],
//           "plan_de_comidas": [
//             {
//               "comida": "Desayuno",
//               "alimentos": [
//                 {
//                   "nombre": "Huevos",
//                   "cantidad": "4 unidades",
//                   "calorias": 320,
//                   "proteinas": 24,
//                   "carbohidratos": 2,
//                   "grasas": 20
//                 },
//                 {
//                   "nombre": "Pan integral",
//                   "cantidad": "2 rebanadas",
//                   "calorias": 160,
//                   "proteinas": 8,
//                   "carbohidratos": 30,
//                   "grasas": 2
//                 },
//                 {
//                   "nombre": "Leche",
//                   "cantidad": "1 vaso",
//                   "calorias": 120,
//                   "proteinas": 8,
//                   "carbohidratos": 12,
//                   "grasas": 5
//                 }
//               ]
//             },
//             {
//               "comida": "Almuerzo",
//               "alimentos": [
//                 {
//                   "nombre": "Pechuga de pollo",
//                   "cantidad": "200g",
//                   "calorias": 330,
//                   "proteinas": 60,
//                   "carbohidratos": 0,
//                   "grasas": 5
//                 },
//                 {
//                   "nombre": "Arroz integral",
//                   "cantidad": "100g",
//                   "calorias": 110,
//                   "proteinas": 3,
//                   "carbohidratos": 23,
//                   "grasas": 1
//                 },
//                 {
//                   "nombre": "Brócoli",
//                   "cantidad": "100g",
//                   "calorias": 34,
//                   "proteinas": 3,
//                   "carbohidratos": 7,
//                   "grasas": 0
//                 }
//               ]
//             }
//             // Continúa con las demás comidas del día
//           ],
//           "comentarios": "Este plan de comidas está diseñado para maximizar el aporte de nutrientes y favorecer el crecimiento muscular en base a tu objetivo de ${userProfile.objetivo}."
//         }
        
//         Asegúrate de devolver SOLO el JSON sin ningún comentario, encabezado, o pie de página. La respuesta debe ser JSON válido.
//         `;
//         ;

//         try {
//             const response = await fetch('http://localhost:3002/api/openai/generate', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ prompt })
//             });
        
//             const data = await response.json();
//             console.log(data.choices[0].message.content);
        
//             let mealObject;
        
//             try {
//                 mealObject = JSON.parse(data.choices[0].message.content);
//             } catch (parseError) {
//                 console.error('Error parsing JSON:', parseError);
//                 return; // Salimos de la función si no se puede parsear la respuesta
//             }
        
//             setMeal(mealObject);
//             const savedMeals = JSON.parse(localStorage.getItem('meals')) || [];
//             localStorage.setItem('meals', JSON.stringify([...savedMeals, mealObject]));
//         } catch (error) {
//             console.error('Error generating meal:', error);
//         } finally {
//             setIsLoading(false);
//         }
        
//     };

//     return (
//         <div className="create-meal-container">
//             <h2>Crear Comida</h2>
//             <div className="df">
//                 <input
//                     type="text"
//                     placeholder="Escribe un alimento..."
//                     value={alimento}
//                     onChange={(e) => setAlimento(e.target.value)}
//                 />
//                 <button onClick={addAlimento} className='agregarbut'>Agregar</button>
//             </div>
//             <div className='todo-list'>
//                 <ul>
//                     {alimentos.map((alimento, index) => (
//                         <li key={index}>
//                             {alimento}
//                             <button onClick={() => removeAlimento(index)}></button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <button onClick={createMealPlan} className='genbut'>Generar Comida</button>
//             {isLoading && (
//                 <div className="loader-container">
//                     <div className="loader"></div>
//                     <p>Loading...</p>
//                 </div>
//             )}
//             {meal && (
//                 <div className="meal-result">
//                     <h2>Generated Meal Plan</h2>
//                     <div className="meal-table">
//                         {meal.plan_de_comidas.map((comida, index) => (
//                             <div key={index} className="meal-day">
//                                 <h3>{comida.comida}</h3>
//                                 <table>
//                                     <thead>
//                                         <tr>
//                                             <th>Alimento</th>
//                                             <th>Cantidad</th>
//                                             <th>Calorías</th>
//                                             <th>Proteínas (g)</th>
//                                             <th>Carbohidratos (g)</th>
//                                             <th>Grasas (g)</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {comida.alimentos.map((alimento, idx) => (
//                                             <tr key={idx}>
//                                                 <td>{alimento.nombre}</td>
//                                                 <td>{alimento.cantidad}</td>
//                                                 <td>{alimento.calorias}</td>
//                                                 <td>{alimento.proteinas}</td>
//                                                 <td>{alimento.carbohidratos}</td>
//                                                 <td>{alimento.grasas}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CreateMeal;

import React, { useState, useEffect } from 'react';
import { PropagateLoader } from 'react-spinners'; // Importa el spinner de react-spinners
import './CreateMeal.css';

const CreateMeal = () => {
    const [meal, setMeal] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [alimento, setAlimento] = useState('');
    const [alimentos, setAlimentos] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Estado para manejar el loader

    useEffect(() => {
        const savedData = localStorage.getItem('userProfile');
        if (savedData) {
            const profile = JSON.parse(savedData);
            if (profile.nombre && profile.edad && profile.peso && profile.altura && profile.genero && profile.frecuencia && profile.objetivo) {
                setUserProfile(profile);
            } else {
                window.location.href = '/';
            }
        }
    }, []);

    const getTMB = () => {
        if (!userProfile) return 0;
        const { genero, peso, altura, edad } = userProfile;
        if (genero === 'hombre') {
            return 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * edad);
        } else {
            return 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * edad);
        }
    };

    const getTDEE = () => {
        const tmb = getTMB();
        const { frecuencia } = userProfile;
        switch (frecuencia) {
            case '1-2':
                return tmb * 1.375;
            case '3-4':
                return tmb * 1.55;
            case '5-6':
                return tmb * 1.725;
            case '7':
                return tmb * 1.9;
            default:
                return tmb * 1.2;
        }
    };

    const addAlimento = () => {
        if (alimento.trim() !== '') {
            setAlimentos([...alimentos, alimento]);
            setAlimento('');
        }
    };

    const removeAlimento = (index) => {
        const newAlimentos = alimentos.filter((_, i) => i !== index);
        setAlimentos(newAlimentos);
    };

    const createMealPlan = async () => {
        setIsLoading(true); // Mostrar loader al iniciar la solicitud
        const tdee = getTDEE();
        const prompt = `
Eres un experto en nutrición dedicado a proporcionar asesoramiento detallado y personalizado sobre planes de alimentación. Puedes crear planes de comidas equilibrados y efectivos para alcanzar objetivos de salud y fitness. Siempre enfatizas la importancia de la consistencia, el equilibrio y la personalización en cada plan. Estás aquí para ayudar a tomar decisiones informadas y motivar a mantener un estilo de vida saludable. Siempre pides información sobre datos personales, como la tasa metabólica basal y el consumo total calórico, para ajustar mejor las recomendaciones.
Datos del usuario: 
  "objetivo": "${userProfile.objetivo}",
  "TDEE": "${tdee} kcal",
  "frecuencia_comidas": "5 comidas al día",
  "edad": "${userProfile.edad}",
  "peso": "${userProfile.peso}",
  "altura": "${userProfile.altura}",
Por favor, devuelve la siguiente información como un objeto JSON válido que pueda ser utilizado directamente en una aplicación. La estructura JSON debe ser la siguiente:

{
  "objetivo": "${userProfile.objetivo}",
  "TDEE": "${tdee} kcal",
  "frecuencia_comidas": "5 comidas al día",
  "edad": "${userProfile.edad}",
  "peso": "${userProfile.peso}",
  "altura": "${userProfile.altura}",
  "alimentos_disponibles": [${alimentos.map(alimento => `"${alimento}"`).join(', ')}],
  "plan_de_comidas": [
    {
      "comida": "Desayuno",
      "alimentos": [
        {
          "nombre": "Huevos",
          "cantidad": "4 unidades",
          "calorias": 320,
          "proteinas": 24,
          "carbohidratos": 2,
          "grasas": 20
        },
        {
          "nombre": "Pan integral",
          "cantidad": "2 rebanadas",
          "calorias": 160,
          "proteinas": 8,
          "carbohidratos": 30,
          "grasas": 2
        },
        {
          "nombre": "Leche",
          "cantidad": "1 vaso",
          "calorias": 120,
          "proteinas": 8,
          "carbohidratos": 12,
          "grasas": 5
        }
      ]
    },
    {
      "comida": "Almuerzo",
      "alimentos": [
        {
          "nombre": "Pechuga de pollo",
          "cantidad": "200g",
          "calorias": 330,
          "proteinas": 60,
          "carbohidratos": 0,
          "grasas": 5
        },
        {
          "nombre": "Arroz integral",
          "cantidad": "100g",
          "calorias": 110,
          "proteinas": 3,
          "carbohidratos": 23,
          "grasas": 1
        },
        {
          "nombre": "Brócoli",
          "cantidad": "100g",
          "calorias": 34,
          "proteinas": 3,
          "carbohidratos": 7,
          "grasas": 0
        }
      ]
    }
    // Continúa con las demás comidas del día
  ],
  "comentarios": "Este plan de comidas está diseñado para maximizar el aporte de nutrientes y favorecer el crecimiento muscular en base a tu objetivo de ${userProfile.objetivo}."
}

Asegúrate de devolver SOLO el JSON sin ningún comentario, encabezado, o pie de página. La respuesta debe ser JSON válido.
`;

        try {
            const response = await fetch('http://localhost:3002/api/openai/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt })
            });

            const data = await response.json();
            let mealObject;

            try {
                mealObject = JSON.parse(data.choices[0].message.content);
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
                return; // Salimos de la función si no se puede parsear la respuesta
            }

            setMeal(mealObject);
            const savedMeals = JSON.parse(localStorage.getItem('meals')) || [];
            localStorage.setItem('meals', JSON.stringify([...savedMeals, mealObject]));
        } catch (error) {
            console.error('Error generating meal:', error);
        } finally {
            setIsLoading(false); // Ocultar loader después de completar
        }
    };

    return (
        <div className="create-meal-container">
            <h2>Crear Comida</h2>
            <div className="df">
                <input
                    type="text"
                    placeholder="Escribe un alimento..."
                    value={alimento}
                    onChange={(e) => setAlimento(e.target.value)}
                />
                <button onClick={addAlimento} className='agregarbut'>Agregar</button>
            </div>
            <div className='todo-list'>
                <ul>
                    {alimentos.map((alimento, index) => (
                        <li key={index}>
                            {alimento}
                            <button onClick={() => removeAlimento(index)}></button>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={createMealPlan} className='genbut'>Generar Comida</button>
            
            {isLoading && (
                <div className="loader-container">
                    <PropagateLoader color="#1e1a1a" loading={isLoading} size={16} />
                </div>
            )}

            {meal && (
                <div className="meal-result">
                    <h2>Generated Meal Plan</h2>
                    <div className="meal-table">
                        {meal.plan_de_comidas.map((comida, index) => (
                            <div key={index} className="meal-day">
                                <h3>{comida.comida}</h3>
                                <table>
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
                                                <td>{alimento.nombre}</td>
                                                <td>{alimento.cantidad}</td>
                                                <td>{alimento.calorias}</td>
                                                <td>{alimento.proteinas}</td>
                                                <td>{alimento.carbohidratos}</td>
                                                <td>{alimento.grasas}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateMeal;
