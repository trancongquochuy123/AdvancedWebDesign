const express = require('express');
const router = express.Router();
const squareController = require('../controllers/square.controller');

// GET /calculator
router.get('/', squareController.index);

// POST /calculator
router.post('/', squareController.calculatorPerimeter);

module.exports = router;
