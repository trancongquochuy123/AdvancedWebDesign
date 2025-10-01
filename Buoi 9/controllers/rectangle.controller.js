const Rectangle = require('../models/rectangel.model');

// GET /calculator
exports.index = (req, res) => {
    res.render('rectangle', { perimeter: null });
}

// POST /calculator
exports.calculatorPerimeter = (req, res) => {
    const width = parseFloat(req.body.width);
    const height = parseFloat(req.body.height);
    const rectangle = new Rectangle(width, height);
    const perimeter = rectangle.getPerimeter();

    console.log(`Width: ${width}, Height: ${height}, Perimeter: ${perimeter}`);
    
    res.render('rectangle', { perimeter: perimeter });
}