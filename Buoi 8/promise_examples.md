
# Lý thuyết và Ví dụ về Promise trong JavaScript

## 1. Promise là gì?
- **Promise** là một đối tượng đại diện cho một giá trị sẽ có trong tương lai (thành công hoặc thất bại).
- Thường dùng trong xử lý **bất đồng bộ** như gọi API, đọc file, query database.

### Trạng thái của Promise
1. **pending**: đang chờ.
2. **fulfilled**: thành công (resolve).
3. **rejected**: thất bại (reject).

---

## 2. Ví dụ cơ bản
```js
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) {
      resolve("✅ Thành công sau 2 giây!");
    } else {
      reject("❌ Thất bại sau 2 giây!");
    }
  }, 2000);
});

myPromise
  .then(result => console.log(result))
  .catch(err => console.error(err))
  .finally(() => console.log("Hoàn tất Promise!"));
```

---

## 3. Ví dụ sumNumber(a, b)
```js
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
  .then(res => console.log("✅ Kết quả:", res))
  .catch(err => console.error(err))
  .finally(() => console.log("Hoàn tất Promise!"));
```

---

## 4. Ví dụ tính Chu vi và Diện tích HCN
```js
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

tinhHCN(5, 3)
  .then(res => {
    console.log("Chu vi:", res.chuVi);
    console.log("Diện tích:", res.dienTich);
  })
  .catch(err => console.error(err))
  .finally(() => console.log("Hoàn tất Promise!"));
```

---

## 5. Ví dụ thực tế Promise

### Gọi API
```js
fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then(data => console.log("Danh sách người dùng:", data))
  .catch(err => console.error("Lỗi khi gọi API:", err))
  .finally(() => console.log("Hoàn tất gọi API!"));
```

### Xử lý nhiều API cùng lúc
```js
const urls = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/comments"
];

Promise.all(urls.map(url => fetch(url).then(res => res.json())))
  .then(([users, posts, comments]) => {
    console.log("👤 Users:", users.length);
    console.log("📝 Posts:", posts.length);
    console.log("💬 Comments:", comments.length);
  })
  .catch(err => console.error("Có lỗi:", err));
```
