class Square {

    constructor(side) {
        this.side = side;
    }

    getArea() {
        return this.side * this.side;
    }

    getPerimeter() {
        return 4 * this.side;
    }
}

module.exports = Square;