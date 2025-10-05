const express = require('express');  
const router = express.Router();  
const productController = require('../controllers/product.controller');  

router.get('/products', productController.getProducts);  
router.get('/products/add', productController.showAddProductForm);  
router.post('/products', productController.addProduct);  

module.exports = router;  