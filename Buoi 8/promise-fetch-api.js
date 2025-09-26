const API_URL = "https://68d39c7b214be68f8c667bc1.mockapi.io/api/v1/product";

function fetchProducts() {
  return fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error! status: " + response.status);
      }
      return response.json();
    })
    .then(data => {
      return data;
    });
}

fetchProducts()
  .then(products => {
    console.log("Danh sách products:", products);
  })
  .catch(err => {
    console.error("Lỗi khi fetch:", err);
  })
  .finally(() => {
    console.log("Hoàn tất fetch API!");
  });
