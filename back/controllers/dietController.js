var { Dieta, Comida } = require('../database/models');

exports.createDiet = async (req, res) => {
    const { id_usuario, calorias, proteinas, carbohidratos, grasas, comidas } = req.body;
    try {
        const diet = await Dieta.create({ id_usuario, calorias, proteinas, carbohidratos, grasas });
        if (comidas && comidas.length > 0) {
            comidas.forEach(async (comida) => {
                await Comida.create({ id_dieta: diet.id_dieta, ...comida });
            });
        }
        res.status(201).json(diet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
