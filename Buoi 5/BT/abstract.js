// Trừu tượng: Người dùng class không cần biết dữ liệu lưu thế nào, chỉ thao tác qua API (deposit/withdraw/getBalance).
class BankAccount {
  #balance; // private (ẩn đi)

  constructor(owner, initialBalance) {
    this.owner = owner;
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      console.log(`${this.owner} nạp ${amount}. Số dư mới: ${this.#balance}`);
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      console.log(`${this.owner} rút ${amount}. Số dư mới: ${this.#balance}`);
    } else {
      console.log("Rút thất bại, số dư không đủ!");
    }
  }

  getBalance() {
    return this.#balance; // chỉ lấy thông qua hàm
  }
}

const acc = new BankAccount("Huy", 1000);
acc.deposit(500);        // ✅ OK
acc.withdraw(300);       // ✅ OK
console.log(acc.getBalance()); // ✅ 1200
// console.log(acc.#balance);  // ❌ Lỗi (private)
