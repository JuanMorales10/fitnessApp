var express = require('express');
var router = express.Router();
var workoutController = require('../controllers/workoutController');

// Crear una rutina de entrenamiento
router.post('/', workoutController.createWorkout);

module.exports = router;
