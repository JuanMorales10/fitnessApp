var { Usuario } = require('../database/models');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { nombre, email, contrasena, direccion, telefono, rol } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const user = await Usuario.create({
            nombre,
            email,
            contrasena: hashedPassword,
            direccion,
            telefono,
            rol
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, contrasena } = req.body;
    try {
        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const isMatch = await bcrypt.compare(contrasena, user.contrasena);
        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        const token = jwt.sign({ id: user.id_usuario }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
