const API_URL = "https://68d39c7b214be68f8c667bc1.mockapi.io/api/v1/product";

// Hàm fetch dùng async/await
async function fetchProducts() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("HTTP error! status: " + response.status);
    }

    const data = await response.json();
    return data; // trả về data cho nơi gọi
  } catch (err) {
    console.error("❌ Lỗi khi fetch:", err);
    throw err; // ném lỗi ra ngoài để nơi gọi xử lý tiếp
  } finally {
    console.log("✅ Hoàn tất fetch API (async/await)!");
  }
}

// Gọi hàm
(async () => {
  try {
    const products = await fetchProducts();
    console.log("Danh sách products:", products);
  } catch (err) {
    console.error("Xử lý lỗi bên ngoài:", err);
  }
})();
