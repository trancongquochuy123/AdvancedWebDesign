function sumNumber(a, b) {
    return new Promise((resolve, reject) => {
        if (typeof a === "number" && typeof b === "number") {
            resolve(a + b);
        } else {
            reject("❌ Lỗi: Cả a và b phải là số!");
        }
    });
}

async function run() {
  try {
    const result1 = await sumNumber(5, 7);
    console.log("✅ Kết quả:", result1);
  } catch (err) {
    console.error(err);
  } finally {
    console.log("Hoàn tất Promise!");
  }

  try {
    const result2 = await sumNumber(5, "hello");
    console.log("✅ Kết quả:", result2);
  } catch (err) {
    console.error(err);
  } finally {
    console.log("Hoàn tất Promise!");
  }
}

run();
