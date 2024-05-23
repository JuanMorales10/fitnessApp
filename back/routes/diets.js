var express = require('express');
var router = express.Router();
var dietController = require('../controllers/dietController');

// Crear una dieta
router.post('/', dietController.createDiet);

module.exports = router;
