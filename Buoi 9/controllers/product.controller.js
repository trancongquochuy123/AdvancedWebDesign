const Product = require('../models/product.model');  

const productController = {  
  getProducts: (req, res) => {  
    Product.getAllProducts((err, products) => {  
      if (err) {  
        return res.status(500).json({ error: 'Database query error' });  
      }  
      return res.render('products', { products });  
    });  
  },  
};  

module.exports = productController;  