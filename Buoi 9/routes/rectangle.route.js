const express = require('express');
const router = express.Router();
const rectangleController = require('../controllers/rectangle.controller');

// GET /calculator
router.get('/', rectangleController.index);

// POST /calculator
router.post('/', rectangleController.calculatorPerimeter);

module.exports = router;
