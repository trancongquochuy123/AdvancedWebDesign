const Square = require('../models/square.model');

// GET /calculator
exports.index = (req, res) => {
    res.render('square', { area: null, perimeter: null });
}

// POST /calculator
exports.calculatorPerimeter = (req, res) => {
    const side = parseFloat(req.body.side);
    const square = new Square(side);
    const perimeter = square.getPerimeter();
    const area = square.getArea();

    console.log(`Side: ${side}, Area: ${area}, Perimeter: ${perimeter}`);

    res.render('square', { area: area, perimeter: perimeter });
}