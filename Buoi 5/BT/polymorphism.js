// 📌 Đa hình: Gọi area() nhưng kết quả phụ thuộc vào loại đối tượng (hình tròn hay hình chữ nhật).// 
class Shape {
  area() {
    throw new Error("Phải override method area()");
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  area() {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  area() {
    return this.width * this.height;
  }
}

// Demo
const shapes = [
  new Circle(5),
  new Rectangle(4, 6),
];

shapes.forEach(s => {
  console.log("Diện tích:", s.area()); 
});
