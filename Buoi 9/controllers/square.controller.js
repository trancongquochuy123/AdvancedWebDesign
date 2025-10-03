const Square = require('../models/square.model');

// GET /square
exports.index = (req, res) => {
    res.render('square', { area: null, perimeter: null });
}

// POST /square
exports.calculatorPerimeter = async (req, res) => {
    try {
        const side = parseFloat(req.body.side);

        // Tính toán trước
        const perimeter = 4 * side;
        const area = side * side;

        // Tạo document
        const square = new Square({
            sideLength: side,
            perimeter: perimeter,
            area: area
        });

        // Lưu vào DB
        const savedSquare = await square.save();

        // 👉 Log ra document vừa lưu trong MongoDB
        console.log("✅ Square saved:", savedSquare);

        // Render ra view
        res.render('square', { area, perimeter });
    } catch (error) {
        console.error("❌ Error saving square:", error.message);
        res.status(500).send("Error calculating square");
    }
};
