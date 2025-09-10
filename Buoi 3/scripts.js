const menProduct = [
    { name: 'Quần jean nam', img: 'https://picsum.photos/300/300?random=1', code: '12345', price: 100 },
    { name: 'Áo thun nam', img: 'https://picsum.photos/300/300?random=1', code: '12346', price: 50 },
    { name: 'Giày thể thao nam', img: 'https://picsum.photos/300/300?random=1', code: '12347', price: 150 },
    { name: 'Áo sơ mi nam', img: 'https://picsum.photos/300/300?random=1', code: '12348', price: 200 }
];

const womenProduct = [
    { name: 'Quần jean nữ', img: 'https://picsum.photos/300/300?random=2', code: '54321', price: 100 },
    { name: 'Áo thun nữ', img: 'https://picsum.photos/300/300?random=2', code: '54322', price: 50 },
    { name: 'Giày cao gót nữ', img: 'https://picsum.photos/300/300?random=2', code: '54323', price: 150 },
    { name: 'Váy nữ', img: 'https://picsum.photos/300/300?random=2', code: '54324', price: 200 }
];

const allProducts = [...menProduct, ...womenProduct];
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");

function renderProducts(products) {
    productList.innerHTML = "";
    products.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${p.img}" alt="${p.name}">
          <h3>${p.name} - ${p.code}</h3> 
          <h4 class="price">${p.price}$</h4>
          <h4 class="price-discount">${p.price * 60 / 100}$</h4>
          <button class="add-to-cart-button">Add to Cart</button>
        `;
        productList.appendChild(card);
    });
}

function renderTitle(title) {
    const productTitle = document.querySelector(".product-title");
    productTitle.textContent = title;
};

renderProducts(allProducts);
renderTitle("Tất cả sản phẩm");

document.querySelectorAll(".nav-items a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelectorAll(".nav-items a").forEach(a => a.classList.remove("active"));

        link.classList.add("active");

        const category = link.getAttribute("data-category");
        if (category === "men") {
            renderProducts(menProduct);
            renderTitle("Thời trang nam");
        } else if (category === "women") {
            renderProducts(womenProduct);
            renderTitle("Thời trang nữ");
        } else {
            renderProducts(allProducts);
            renderTitle("Tất cả sản phẩm");
        }
    });
});


// Search functionality
function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const filteredProducts = allProducts.filter(p => p.name.toLowerCase().includes(query) || p.code.includes(query));
    renderProducts(filteredProducts);
}
searchInput.addEventListener("input", handleSearch);