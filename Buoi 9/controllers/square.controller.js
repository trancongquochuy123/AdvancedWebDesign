// const Square = require('../models/square.model');

// // GET /square
// exports.index = (req, res) => {
//     res.render('square', { area: null, perimeter: null });
// }

// // POST /square
// exports.calculatorPerimeter = async (req, res) => {
//     try {
//         const side = parseFloat(req.body.side);

//         // Tính toán trước
//         const perimeter = 4 * side;
//         const area = side * side;

//         // Tạo document
//         const square = new Square({
//             sideLength: side,
//             perimeter: perimeter,
//             area: area
//         });

//         // Lưu vào DB
//         const savedSquare = await square.save();

//         // 👉 Log ra document vừa lưu trong MongoDB
//         console.log("✅ Square saved:", savedSquare);

//         // Render ra view
//         res.render('square', { area, perimeter });
//     } catch (error) {
//         console.error("❌ Error saving square:", error.message);
//         res.status(500).send("Error calculating square");
//     }
// };


const squareModel = require('../models/square.model');


// Controller để hiển thị form  
exports.showForm = (req, res) => {  
    res.render('index', { perimeter: null, area: null });  
};  

// Controller để tính chu vi và diện tích và lưu vào MySQL  
exports.calculateSquare = async (req, res) => {  
    const { sideLength } = req.body;  

    const perimeter = 4 * sideLength;  
    const area = sideLength * sideLength;  

    try {  
        await squareModel.saveSquareData(sideLength, perimeter, area);  
        res.render('index', { perimeter, area });  
    } catch (error) {  
        console.error('Error saving to database', error);  
        res.status(500).send('Server Error');  
    }  
};  