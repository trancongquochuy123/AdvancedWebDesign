function tinhHCN(dai, rong) {
    return new Promise((resolve, reject) => {
        if (typeof dai !== "number" || typeof rong !== "number" || dai <= 0 || rong <= 0) {
            reject("❌ Lỗi: Chiều dài và chiều rộng phải là số dương!");
        } else {
            const chuVi = 2 * (dai + rong);
            const dienTich = dai * rong;
            resolve({ chuVi, dienTich });
        }
    });
}
// Promise chaining
tinhHCN(5, 3)
    .then(result => {
        console.log("✅ Kết quả HCN (5x3):");
        console.log("Chu vi:", result.chuVi);
        console.log("Diện tích:", result.dienTich);

        // return Promise tiếp theo để chain
        return tinhHCN(5, "abc");
    })
    .then(result2 => {
        console.log("✅ Kết quả HCN thứ 2:", result2);
    })
    .catch(err => {
        console.error("❌ Có lỗi:", err);
    })
    .finally(() => {
        console.log("Hoàn tất tất cả Promise!");
    });
