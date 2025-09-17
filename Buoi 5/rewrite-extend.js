class Employee {
  showInfo() {
    console.log(`Employee`);
  }
}

class MaleEmployee extends Employee {

  showInfo() {
    super.showInfo(); // gọi method của class cha
    console.log(`MaleEmployee`);
  }
}

// ---------------- Demo ----------------
const e1 = new Employee("An");
e1.showInfo();
// Employee: An

const e2 = new MaleEmployee("Bình", "Male");
e2.showInfo();
// Employee: Bình
// Gender: Male
