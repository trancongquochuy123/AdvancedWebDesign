// Hàm fetchProducts có callback
function fetchProducts(callback) {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      callback(null, data); // gọi callback với dữ liệu
    })
    .catch((error) => {
      callback(error, null); // gọi callback nếu có lỗi
    });
}

// Callback để xử lý dữ liệu
function handleProducts(error, data) {
  if (error) {
    console.error("Lỗi khi fetch:", error);
  } else {
    console.log("Dữ liệu sản phẩm:", data);
  }
}

// Gọi hàm
fetchProducts(handleProducts);
