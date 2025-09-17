class MyClass {
  a = 1;          // public
  #b = 2;         // private
  static #c = 3;  // private + static

  incB() {
    this.#b++;   // ✅ dùng được vì bên trong class
    console.log(this.#b);
  }
}

const m = new MyClass();

m.incB(); // ✅ chạy OK, in ra 3
// m.#b = 0;  ❌ Lỗi: không truy cập private từ ngoài class


class MyClass {
  // private property
  #x = 0;

  // private method
  #incX() {
    this.#x++;
    console.log(this.#x);
  }

  // private setter
  set #setX(x) {
    this.#x = x;
  }

  // private getter
  get #getX() {
    return this.#x;
  }
}


m.incX();  // ❌ Lỗi!
