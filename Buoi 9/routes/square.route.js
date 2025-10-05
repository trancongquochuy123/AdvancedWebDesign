// const express = require('express');
// const router = express.Router();
const squareController = require('../controllers/square.controller');

// // GET /calculator
// router.get('/', squareController.index);

// // POST /calculator
// router.post('/', squareController.calculatorPerimeter);

// module.exports = router;
const express = require('express');  
const router = express.Router();  

// Route để hiển thị form  
router.get('/', squareController.showForm);  

// Route để tính chu vi và diện tích  
router.post('/calculate', squareController.calculateSquare);  

module.exports = router;  