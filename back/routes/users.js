var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

// Registrar usuario
router.post('/register', userController.register);

// Login de usuario
router.post('/login', userController.login);

module.exports = router;
