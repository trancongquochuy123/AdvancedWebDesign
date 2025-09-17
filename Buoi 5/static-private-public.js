// 1. public
// Mặc định trong JS, mọi thuộc tính và phương thức khai báo không có dấu # đều là public.
// Có thể truy cập từ bên ngoài class.

class Person {
  constructor(name) {
    this.name = name; // public
  }

  sayHello() {
    console.log(`Hello, I'm ${this.name}`);
  }
}

const p = new Person("Huy");
console.log(p.name);   // ✅ Truy cập được
p.sayHello();          // ✅ Truy cập được

// =====================================================================================================================

// 2. private
// Dùng # để định nghĩa thuộc tính hoặc phương thức private.
// Chỉ được dùng bên trong class.
// Bên ngoài không thể truy cập.

class BankAccount {
  #balance; // private

  constructor(owner, balance) {
    this.owner = owner; 
    this.#balance = balance; 
  }

  deposit(amount) {
    this.#balance += amount;
    console.log(`Deposit success. New balance: ${this.#balance}`);
  }

  getBalance() {
    return this.#balance; // chỉ có thể lấy qua method
  }
}

const acc = new BankAccount("Huy", 1000);
console.log(acc.owner);       // ✅ Truy cập được
// console.log(acc.#balance); // ❌ Lỗi: private
acc.deposit(500);             // ✅ OK
console.log(acc.getBalance()); // ✅ 1500

// =====================================================================================================================

// 3. static
// Gắn với class, không gắn với object instance.
// Gọi trực tiếp qua tên class.
// Dùng để định nghĩa hàm tiện ích (utility) hoặc biến chung cho tất cả object.
class MathUtils {
  static PI = 3.14159;   // static property

  static add(a, b) {     // static method
    return a + b;
  }
}

console.log(MathUtils.PI);       // ✅ 3.14159
console.log(MathUtils.add(2,3)); // ✅ 5

// const m = new MathUtils();
// console.log(m.add(2,3)); ❌ Lỗi: static chỉ gọi qua class
