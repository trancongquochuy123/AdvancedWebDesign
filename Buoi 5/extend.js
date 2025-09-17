// Lớp cha: House
class House {
  constructor(address) {
    this.address = address;
  }

  showAddress() {
    console.log(`🏠 Địa chỉ: ${this.address}`);
  }
}

// Lớp con: Mansion (kế thừa từ House)
class Mansion extends House {
  constructor(address, room) {
    super(address); // gọi constructor của House
    this.room = room;
  }

  showRoom() {
    console.log(`🛏️ Số phòng: ${this.room}`);
  }
}

// ---------------- Demo ----------------
const house = new House("123, Hà Nội");
house.showAddress();

const mansion = new Mansion("456, HCM", 12);
mansion.showAddress(); // kế thừa từ House
mansion.showRoom();    // method riêng của Mansion


// =======================================================================================

// Lớp cha
class Car {
  constructor(brand) {
    this.brand = brand;
  }

  showInfo() {
    console.log(`Car brand: ${this.brand}`);
  }
}

// Lớp con
class ElectricCar extends Car {
  constructor(brand, battery) {
    super(brand); 
    this.battery = battery;
  }

  showInfo() {
    super.showInfo(); 
    console.log(`Battery: ${this.battery} kWh`);
  }
}

// Test
const c1 = new Car("Toyota");
c1.showInfo();

const c2 = new ElectricCar("Tesla", 100);
c2.showInfo();
