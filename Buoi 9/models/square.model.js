// 🔹 Nếu bạn cần class riêng để tính toán trước khi lưu DB
// 👉 Dùng cách 1 (export cả class và model).
// const mongoose = require('mongoose');  
// // Định nghĩa schema cho hình vuông  
// const squareSchema = new mongoose.Schema({  
//     sideLength: { type: Number, required: true },  
//     perimeter: { type: Number, required: true },  
//     area: { type: Number, required: true },  
// });  
// // Tạo model từ schema  
// const SquareModel = mongoose.model('Square', squareSchema);  
// // Class cho logic tính toán
// class Square {
//     constructor(side) {
//         this.side = side;
//     }
//     getArea() {
//         return this.side * this.side;
//     }
//     getPerimeter() {
//         return 4 * this.side;
//     }
// }
// // Export cả hai
// module.exports = { SquareModel, Square };



// ======================================================================================================================
// 2. Gộp chung vào model (nếu chỉ muốn dùng Mongoose)
// const mongoose = require('mongoose');  

// const squareSchema = new mongoose.Schema({  
//     sideLength: { type: Number, required: true },  
//     perimeter: { type: Number, required: true },  
//     area: { type: Number, required: true },  
// });  

// // Thêm method vào schema
// squareSchema.methods.getArea = function () {
//     return this.sideLength * this.sideLength;
// };

// squareSchema.methods.getPerimeter = function () {
//     return 4 * this.sideLength;
// };

// const Square = mongoose.model('Square', squareSchema);

// module.exports = Square;

require('dotenv').config(); // 🔹 Nạp biến môi trường từ file .env

const mysql = require('mysql2');

// Tạo kết nối đến cơ sở dữ liệu MySQL  
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Hàm để lưu thông tin hình vuông vào MySQL  
const saveSquareData = (sideLength, perimeter, area) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO squares (sideLength, perimeter, area) VALUES (?, ?, ?)';
        pool.query(sql, [sideLength, perimeter, area], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = {
    saveSquareData,
};  