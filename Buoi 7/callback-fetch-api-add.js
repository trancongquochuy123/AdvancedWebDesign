function fetchProducts(callback) {
    fetch("https://68d39c7b214be68f8c667bc1.mockapi.io/api/v1/product")
        .then((response) => response.json())
        .then((data) => {
            console.log("Fetched data:", data); // log dữ liệu
            if (callback) {
                callback(data); // gọi callback và truyền data vào
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

// Gọi hàm và truyền callback
fetchProducts((products) => {
    console.log("Callback data:", products);
});


function addProduct(newProduct, callback) {
    fetch("https://68d39c7b214be68f8c667bc1.mockapi.io/api/v1/product", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Added product:", data);
            if (callback) {
                callback(data);
            }
        })
        .catch((error) => {
            console.error("Error adding product:", error);
        });
}

// Ví dụ thêm sản phẩm
addProduct(
    { name: "New Product", price: 1500 },
    (result) => {
        console.log("Callback after add:", result);
    }
);
