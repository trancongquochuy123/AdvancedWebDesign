const express = require('express');  
const router = express.Router();  
const pageController = require('../controllers/page.controller');  

// Định nghĩa các route  
router.get('/', pageController.home);  
router.get('/about', pageController.about);  
router.get('/contact', pageController.contact);  

module.exports = router;  