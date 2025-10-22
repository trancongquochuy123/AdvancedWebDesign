const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');

// Trang chủ
router.get('/', clientController.getHomePage);

// Trang chi tiết sản phẩm
router.get('/:id', clientController.getProductDetail);

module.exports = router;
