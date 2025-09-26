function sumNumber(a, b) {
    return new Promise((resolve, reject) => {
        if (typeof a === "number" && typeof b === "number") {
            resolve(a + b);
        } else {
            reject("❌ Lỗi: Cả a và b phải là số!");
        }
    });
}

sumNumber(5, 7)
  .then(result => {
    console.log("✅ Kết quả:", result);
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log("Hoàn tất Promise!");
    // Sau khi Promise 1 xong mới gọi Promise 2
    return sumNumber(5, "hello")
      .then(result => console.log("✅ Kết quả:", result))
      .catch(error => console.error(error))
      .finally(() => console.log("Hoàn tất Promise!"));
  });
