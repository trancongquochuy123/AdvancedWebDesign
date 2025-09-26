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
    });


sumNumber(5, "hello")
    .then(result => console.log(result))
    .catch(error => console.error(error))
    .finally(() => console.log("Hoàn tất Promise!"));


// 👉 Ở đây bạn gọi 2 Promise riêng biệt:
// sumNumber(5, 7) → resolve → in ra ✅ Kết quả: 12 + Hoàn tất Promise!.
// sumNumber(5, "hello") → reject → in ra ❌ Lỗi... + Hoàn tất Promise!.
// Vì vậy Node.js chạy bất đồng bộ, nên thứ tự in ra không đảm bảo như bạn nghĩ (không bắt buộc Promise 1 chạy xong mới đến Promise 2).

// ✅ Kết quả: 12
// ❌ Lỗi: Cả a và b phải là số!
// Hoàn tất Promise!
// Hoàn tất Promise!


// Note: Nếu bạn muốn Promise 2 chạy sau khi Promise 1 kết thúc, thì phải chain hoặc dùng async/await.