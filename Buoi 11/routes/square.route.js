const express = require('express');
const router = express.Router();
const squareController = require('../controllers/square.controller');

router.get('/', squareController.getForm);
router.post('/calculate', squareController.postForm);
router.get('/list', squareController.getList);

module.exports = router;
