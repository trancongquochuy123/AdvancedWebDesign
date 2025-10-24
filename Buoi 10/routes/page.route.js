const express = require('express');  
const router = express.Router();  
const pageController = require('../controllers/page.controller');  

// Định nghĩa các route  
router.get('/', pageController.home);  
router.get('/about', pageController.about);  
router.get('/contact', pageController.contact);  
router.get('/product_type', pageController.product_type);  
router.get('/404', pageController.not_found);  
router.get('/checkout', pageController.checkout);  
router.get('/login', pageController.login);  
router.get('/signup', pageController.signup);  
router.get('/shopping_cart', pageController.shopping_cart);  
router.get('/pricing', pageController.pricing);  
router.get('/product', pageController.product);  

module.exports = router;  