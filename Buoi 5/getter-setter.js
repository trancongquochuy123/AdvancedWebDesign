class HCN {
    // Thay vì gán trực tiếp, hãy dùng this.height = height; 
    // và this.width = width; để đi qua setter (nơi bạn đã viết validate).
    #height;
    _width;

    constructor(height, width) {
        this.height = height; // gọi setter -> validate
        this.width = width;
    }

    // Getter
    get height() { return this.#height; }
    get width() { return this._width; }

    // Setter có validate
    set height(value) {
        if (typeof value !== "number" || value <= 0) {
            throw new Error("Height must be a positive number");
        }
        this.#height = value;
    }

    set width(value) {
        if (typeof value !== "number" || value <= 0) {
            throw new Error("Width must be a positive number");
        }
        this._width = value;
    }

    // Method
    area() { return this.#height * this._width; }
    perimeter() { return 2 * (this.#height + this._width); }
}


// ----------------- Example -----------------
try {
    const rect = new HCN(10, 5);
    console.log("Diện tích:", rect.area());     // 50
    console.log("Chu vi:", rect.perimeter());   // 30

    rect.height = 20;
    console.log("Chu vi mới:", rect.perimeter()); // 50

    const wrong = new HCN(-1, 5); // ❌ Lỗi ngay
} catch (e) {
    console.error("Error:", e.message);
}
