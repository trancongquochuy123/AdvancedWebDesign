async function getData() {
    try {
        const response = await fetch("https://656ca88ee1e03bfd572e9c16.mockapi.io/products");
        const product = await response.json();

        const { id, name, price, features } = product[0];


        console.log("features", features);

        console.log("object 1", product[0]);
        console.log("object 2", product[1]);
        const newObject = { ...product[0], ...product[1] }
        // Nếu 2 object có cùng key → object bên phải sẽ ghi đè.
        console.log("newObject", newObject);


        const clonedProduct = {
            id,
            name,
            price,
            features: {
                ...features,
                warranty: "2 years"
            }
        }

    } catch (error) {
        console.log("404");
    }
}

// getData()

// Cách 1 
function getParam(a, b, ...c) {
    let sum = a + b

    for (let i of c) {
        sum += Number(i);
    }

    console.log("sum =", sum);
}

getParam(1, "haha", 2, 3, 4, 5, 6)
getParam(1, 2, 3, 4, 5, 6)

// Cách 2: Vòng lặp
let a = 0;
const sum = (arr) => {
    arr.forEach(b => a += b)
    return a
}

const arr = [1,2,3,4,5]
console.log("sum =",sum(arr));

// 1. concat: nối mảng mà không thay đổi chuỗi
// 2. reduce – Rút gọn mảng thành 1 giá trị
    // - accumulator (acc) → lưu kết quả tích lũy
    // - currentValue (val) → giá trị hiện tại của mảng
    // - initialValue → giá trị bắt đầu cho acc