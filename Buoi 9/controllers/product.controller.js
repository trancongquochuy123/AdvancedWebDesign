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
  showAddProductForm: (req, res) => {  
    return res.render('formProduct', { product: {} });  
  },  
  addProduct: (req, res) => {  
    const productData = req.body;  
    Product.createProduct(productData, (err) => {  
      if (err) {  
        return res.status(500).json({ error: 'Failed to add product' });  
      }  
      return res.redirect('/api/products');  
    });  
  },  
  showEditProductForm: (req, res) => {  
    const id = req.params.id;  
    Product.getProductById(id, (err, product) => {  
      if (err || !product) {  
        return res.status(404).json({ error: 'Product not found' });  
      }  
      return res.render('formProduct', { product });  
    });  
  },  
  updateProduct: (req, res) => {  
    const id = req.params.id;  
    const productData = req.body;  
    Product.updateProduct(id, productData, (err) => {  
      if (err) {  
        return res.status(500).json({ error: 'Failed to update product' });  
      }  
      return res.redirect('/api/products');  
    });  
  },  
  deleteProduct: (req, res) => {  
    const id = req.params.id;  
    Product.deleteProduct(id, (err) => {  
      if (err) {  
        return res.status(500).json({ error: 'Failed to delete product' });  
      }  
      return res.redirect('/api/products');  
    });  
  }  
};  

module.exports = productController;  