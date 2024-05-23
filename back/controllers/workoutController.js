var { Entrenamiento, Ejercicio } = require('../database/models');

exports.createWorkout = async (req, res) => {
    const { id_usuario, tipo, frecuencia, ejercicios } = req.body;
    try {
        const workout = await Entrenamiento.create({ id_usuario, tipo, frecuencia });
        if (ejercicios && ejercicios.length > 0) {
            ejercicios.forEach(async (ejercicio) => {
                await Ejercicio.create({ id_entrenamiento: workout.id_entrenamiento, ...ejercicio });
            });
        }
        res.status(201).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
