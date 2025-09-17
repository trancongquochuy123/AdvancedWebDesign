// Khi bạn destructure → tạo biến mới, thay đổi biến đó không làm thay đổi object/array gốc.
// Nếu muốn thay đổi dữ liệu gốc → phải gán trực tiếp vào object/array.

//  ============= Destructuring với Array, Rest Operation, Magic Comma ==============
const numbers = [1, 2, 3, 4];

// gán biến theo vị trí
const [a, b, c] = numbers;

console.log(a); // 1
console.log(b); // 2
console.log(c); // 3

// bỏ qua phần tử
const [x, , y] = numbers;
console.log(x, y); // 1 3

// dùng rest operator
const [first, ...rest] = numbers;
console.log(first); // 1
console.log(rest);  // [2, 3, 4]

// Magic comma
const [one,,,four] = numbers;
console.log(one); // 1
console.log(four);  // 4

//  ============= Destructuring với Object ==============
const person = { name: "Huy", age: 25, city: "Hà Nội" };

// gán biến theo tên key
const { name, age } = person;
console.log(`I am ${name}, I'm ${age} years old`); // Huy

// đổi tên biến khi destructuring
const { city: thanhPho } = person;
console.log(thanhPho); // Hà Nội

// đặt giá trị mặc định
const { country = "Việt Nam" } = person;
console.log(country); // Việt Nam


//  ============= Destructuring với Function Parameter ==============
function printUser({ name, age }) {
    console.log(`Tên: ${name}, Tuổi: ${age}`);
}

const user = { name: "Lan", age: 20, city: "Huế" };

printUser(user); // Tên: Lan, Tuổi: 20

//  ============= Nested Destructuring ==============
const student = {
    id: 1,
    info: {
        name: "Nam",
        scores: [8, 9, 10]
    }
};

const { info: { name: studentName, scores: [math, physics, english] } } = student;

console.log(studentName); // Nam
console.log(math, physics, english); // 8 9 10


// hoán đổi giá trị bằng destructuring
let x1 = 1, y1 = 2;
 
[x1, y1] = [y1, x1];

console.log(x1, y1); // 2 1




const users = [
    {
        name:"A",
        address: "123",
        age: 30,
    },
    {
        name:"B",
        address: "456",
        age: 31,
    },
    {
        name:"C",
        address: "789",
        age: 32,
    },
]

const [user1 ,user2 ,user3] = users
console.log(user1);
console.log(user2);
console.log(user3);

const clone = {...users}
const clone1 = [...users]
console.log(clone[0]);
console.log(clone1);
console.log(users);




