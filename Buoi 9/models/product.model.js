const db = require('../database/mysql');  

const Product = {  
  getAllProducts: (callback) => {  
    db.query('SELECT * FROM product', (err, results) => {  
      if (err) return callback(err);  
      return callback(null, results);  
    });  
  },  
  createProduct: (productData, callback) => {  
    db.query('INSERT INTO product (name, price, description) VALUES (?, ?, ?)',   
      [productData.name, productData.price, productData.description],  
      (err, results) => {  
        if (err) return callback(err);  
        return callback(null, results);  
      }  
    );  
  }  
};  

module.exports = Product;  