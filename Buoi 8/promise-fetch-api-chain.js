function fetchProducts() {
  return fetch("https://68d39c7b214be68f8c667bc1.mockapi.io/api/v1/product")
    .then(res => {
      if (!res.ok) throw new Error("HTTP status " + res.status);
      return res.json();
    });
}

function fetchProductDetail(id) {
  return fetch(`https://68d39c7b214be68f8c667bc1.mockapi.io/api/v1/product/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("HTTP status " + res.status);
      return res.json();
    });
}

// chaining
fetchProducts()
  .then(products => {
    console.log("Products:", products);
    if (products.length > 0) {
      const first = products[0];
      return fetchProductDetail(first.id);
    } else {
      throw new Error("Không có sản phẩm nào!");
    }
  })
  .then(detail => {
    console.log("Chi tiết sản phẩm đầu:", detail);
  })
  .catch(err => {
    console.error("Lỗi:", err);
  })
  .finally(() => {
    console.log("Hoàn tất chuỗi fetch!");
  });
