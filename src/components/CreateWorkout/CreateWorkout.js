import React, { useState, useEffect } from 'react';
import { PropagateLoader } from 'react-spinners'; // Importa el spinner de react-spinners
import './CreateWorkout.css';

const CreateWorkout = () => {
    const [workout, setWorkout] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [nivelExperiencia, setNivelExperiencia] = useState('');
    const [tipoRutina, setTipoRutina] = useState('');
    const [duracionRutina, setDuracionRutina] = useState('');
    const [equipamiento, setEquipamiento] = useState('');
    const [preferencias, setPreferencias] = useState('');
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

    const createWorkoutPlan = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setIsLoading(true); // Mostrar loader inmediatamente
        const tdee = getTDEE();
        const prompt = `
        Eres un experto en nutrición y entrenador personal dedicado a proporcionar asesoramiento detallado y personalizado sobre nutrición, entrenamiento físico y estilo de vida saludable. Puedes crear planes de alimentación balanceados, rutinas de ejercicio efectivas y proporcionar orientación sobre cómo alcanzar objetivos de salud y fitness. Siempre enfatizas la importancia de la consistencia, el equilibrio y la personalización en cada plan. Estás aquí para ayudar a tomar decisiones informadas y motivar a mantener un estilo de vida saludable. Siempre pides información sobre datos personales, como la tasa metabólica basal y el consumo total calórico, para ajustar mejor las recomendaciones. A la hora de hacer las comidas, preguntas cuál es el objetivo. Debes evitar cualquier otro tema que no esté relacionado con el fitness y la nutrición. Estás comprometido a proporcionar la mejor información posible, asegurándote de que esté basada en evidencia científica y adaptada a las necesidades individuales. Te comunicas de manera formal y detallada para asegurar claridad y precisión en la información proporcionada. Evita hablar de más por tema de tokens.
        
        Por favor, devuelve la siguiente información como un objeto JSON para que pueda ser utilizado directamente en una aplicación. Ten en cuenta que la rutina de ejercicios mostrada a continuación es solo un ejemplo. La rutina que debes generar debe basarse en los datos específicos proporcionados por el usuario:
        
        {
          "objetivo": "${userProfile.objetivo}",
          "TDEE": "${tdee} kcal",
          "frecuencia_entrenamiento": "${userProfile.frecuencia}",
          "edad": "${userProfile.edad}",
          "peso": "${userProfile.peso}",
          "altura": "${userProfile.altura}",
          "nivel_experiencia": "${nivelExperiencia}",
          "tipo_rutina": "${tipoRutina}",
          "duracion_rutina": "${duracionRutina}",
          "equipamiento_disponible": "${equipamiento}",
          "preferencias_ejercicio": "${preferencias}",
          "rutina_de_ejercicios": [
            {
              "dia": "Lunes",
              "grupo_muscular": "Pecho / Tríceps",
              "ejercicios": [
                {
                  "nombre": "Press de banca",
                  "series": 4,
                  "repeticiones": "8-12"
                },
                {
                  "nombre": "Press inclinado con mancuernas",
                  "series": 4,
                  "repeticiones": "8-12"
                },
                {
                  "nombre": "Fondos en paralelas",
                  "series": 3,
                  "repeticiones": "10-15"
                },
                {
                  "nombre": "Extensiones de tríceps con cuerda",
                  "series": 3,
                  "repeticiones": "10-15"
                }
              ]
            },
            {
              "dia": "Martes",
              "grupo_muscular": "Espalda / Bíceps",
              "ejercicios": [
                {
                  "nombre": "Peso muerto",
                  "series": 4,
                  "repeticiones": "6-8"
                },
                {
                  "nombre": "Remo con barra",
                  "series": 4,
                  "repeticiones": "8-12"
                },
                {
                  "nombre": "Jalón al pecho",
                  "series": 4,
                  "repeticiones": "8-12"
                },
                {
                  "nombre": "Curl de bíceps con barra",
                  "series": 3,
                  "repeticiones": "8-12"
                }
              ]
            },
            {
              "dia": "Miércoles",
              "grupo_muscular": "Piernas / Hombros",
              "ejercicios": [
                {
                  "nombre": "Sentadillas",
                  "series": 4,
                  "repeticiones": "8-12"
                },
                {
                  "nombre": "Prensa de piernas",
                  "series": 4,
                  "repeticiones": "10-15"
                },
                {
                  "nombre": "Elevaciones laterales",
                  "series": 4,
                  "repeticiones": "12-15"
                },
                {
                  "nombre": "Press militar",
                  "series": 3,
                  "repeticiones": "8-12"
                }
              ]
            },
            // Continúa para los demás días según las preferencias y rutina del usuario
          ],
          "comentarios": "Recuerda ajustar la carga de peso según tu nivel de experiencia y progresar gradualmente para evitar lesiones. Esta rutina está diseñada para maximizar el crecimiento muscular y la fuerza en base a tu objetivo de ${userProfile.objetivo}."
        }
        
        Genera la rutina de ejercicios basándote en los datos proporcionados por el usuario en lugar de la rutina de ejemplo. La rutina debe ser completamente personalizada según el objetivo, nivel de experiencia, tipo de rutina, equipamiento disponible y preferencias de ejercicio del usuario.
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
            console.log(data.choices)
            const workoutObject = JSON.parse(data.choices[0].message.content); // Asumiendo que la respuesta es JSON
            setWorkout(workoutObject);

            const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
            localStorage.setItem('workouts', JSON.stringify([...savedWorkouts, workoutObject]));
        } catch (error) {
            console.error('Error generating workout:', error);
        } finally {
            setIsLoading(false); // Ocultar loader después de completar
        }
    };

    return (
        <div className="create-workout-container">
            {/* Mostrar el loader en pantalla completa */}
            {isLoading && (
                <div className="loader-container">
                    <PropagateLoader color="#1e1a1a" loading={isLoading} size={16} />
                </div>
            )}
            
            {!isLoading && ( /* Renderizar el formulario solo cuando no se está cargando */
                <div className='fo'>
                    <h2>Crear Rutina</h2>
                    <form onSubmit={createWorkoutPlan}> {/* Manejador de evento onSubmit */}
                        <div className="form-group">
                            <label>
                                Nivel de Experiencia:
                                <select value={nivelExperiencia} onChange={(e) => setNivelExperiencia(e.target.value)}>
                                    <option value="">Seleccione...</option>
                                    <option value="principiante">Principiante</option>
                                    <option value="intermedio">Intermedio</option>
                                    <option value="avanzado">Avanzado</option>
                                </select>
                            </label>
                            <label>
                                Tipo de Rutina:
                                <select value={tipoRutina} onChange={(e) => setTipoRutina(e.target.value)}>
                                    <option value="">Seleccione...</option>
                                    <option value="cardio">Cardio</option>
                                    <option value="fuerza">Fuerza</option>
                                    <option value="flexibilidad">Flexibilidad</option>
                                    <option value="mixto">Mixto</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Duración de la Rutina:
                                <select value={duracionRutina} onChange={(e) => setDuracionRutina(e.target.value)}>
                                    <option value="">Seleccione...</option>
                                    <option value="corto">Corto (15-30 minutos)</option>
                                    <option value="medio">Medio (30-60 minutos)</option>
                                    <option value="largo">Largo (60+ minutos)</option>
                                </select>
                            </label>
                            <label>
                                Equipamiento Disponible:
                                <select value={equipamiento} onChange={(e) => setEquipamiento(e.target.value)}>
                                    <option value="">Seleccione...</option>
                                    <option value="sin equipamiento">Sin equipamiento</option>
                                    <option value="equipamiento basico">Equipamiento básico</option>
                                    <option value="gimnasio completo">Gimnasio completo</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Preferencias de Ejercicio:
                                <select value={preferencias} onChange={(e) => setPreferencias(e.target.value)}>
                                    <option value="">Seleccione...</option>
                                    <option value="en casa">Ejercicios en casa</option>
                                    <option value="al aire libre">Ejercicios al aire libre</option>
                                    <option value="en el gimnasio">Ejercicios en el gimnasio</option>
                                </select>
                            </label>
                        </div>
                        <div className='but'></div>
                        <button type="submit">Generar Rutina</button> {/* Botón de envío */}
                    </form>
                </div>
            )}

            {workout && (
                <div className="workout-result">
                    <h2>Generated Workout Plan</h2>
                    <br></br>
                    <div className="workout-table">
                        {workout.rutina_de_ejercicios.map((dia, index) => (
                            <div key={index} className="workout-day">
                                <h3>{dia.dia}: {dia.grupo_muscular}</h3>
                                <table>
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateWorkout;
