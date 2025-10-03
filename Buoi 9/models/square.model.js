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
const mongoose = require('mongoose');  

const squareSchema = new mongoose.Schema({  
    sideLength: { type: Number, required: true },  
    perimeter: { type: Number, required: true },  
    area: { type: Number, required: true },  
});  

// Thêm method vào schema
squareSchema.methods.getArea = function () {
    return this.sideLength * this.sideLength;
};

squareSchema.methods.getPerimeter = function () {
    return 4 * this.sideLength;
};

const Square = mongoose.model('Square', squareSchema);

module.exports = Square;
