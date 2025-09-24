const API_URL = "https://68d39c7b214be68f8c667bc1.mockapi.io/api/v1/product";

// Utility functions for showing messages
function showMessage(message, type) {
    const errorEl = document.getElementById('errorMessage');
    const successEl = document.getElementById('successMessage');

    // Hide both messages first
    errorEl.style.display = 'none';
    successEl.style.display = 'none';

    if (type === 'error') {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    } else {
        successEl.textContent = message;
        successEl.style.display = 'block';
    }

    // Auto hide after 5 seconds
    setTimeout(() => {
        errorEl.style.display = 'none';
        successEl.style.display = 'none';
    }, 5000);
}

function showLoading(show) {
    document.getElementById('loadingMessage').style.display = show ? 'block' : 'none';
}

// Fetch product list and render table
function fetchProducts() {
    showLoading(true);
    fetch(API_URL)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            renderTable(data);
            showLoading(false);
        })
        .catch(err => {
            console.error("Fetch error:", err);
            showMessage("Failed to load products. Please try again.", "error");
            showLoading(false);
        });
}

// Render table rows
function renderTable(products) {
    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = "";

    if (!products || products.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="6" style="text-align: center; padding: 40px; color: #666;">
              No products found. Create your first product!
            </td>
          </tr>
        `;
        return;
    }

    products.forEach(p => {
        // Format date
        const createdDate = p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'N/A';

        // Handle image display
        const imageHtml = p.image
            ? `<img src="${p.image}" alt="${p.name}" class="product-image" onerror="this.src='data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"80\" height=\"80\" viewBox=\"0 0 80 80\"><rect width=\"80\" height=\"80\" fill=\"%23f0f0f0\"/><text x=\"50%\" y=\"50%\" text-anchor=\"middle\" dy=\".3em\" fill=\"%23999\"></text></svg>`
            : `<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><rect width='80' height='80' fill='%23f0f0f0'/><text x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%23999'></text></svg>" alt="" class="product-image">`;

        const row = `
          <tr>
            <td style="font-weight: 600;">${p.id}</td>
            <td>${imageHtml}</td>
            <td style="font-weight: 500;">${p.name || 'N/A'}</td>
            <td style="color: #2e7d32; font-weight: 600;">$${p.price || '0'}</td>
            <td>${createdDate}</td>
            <td>
              <button class="action-btn edit-btn" onclick="startEditProduct(${p.id})">Edit</button>
              <button class="action-btn delete-btn" onclick="deleteProduct(${p.id})">Delete</button>
            </td>
          </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Delete product with confirmation
function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) {
        return;
    }

    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(() => {
            console.log("Deleted product:", id);
            showMessage("Product deleted successfully!", "success");
            fetchProducts(); // reload table
        })
        .catch(err => {
            console.error("Delete error:", err);
            showMessage("Failed to delete product. Please try again.", "error");
        });
}

// Load product info into form for editing
function startEditProduct(id) {
    fetch(`${API_URL}/${id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            showForm(new Event("click"));

            document.getElementById("formTitle").innerText = "Edit Product";

            document.getElementById("name").value = data.name || '';
            document.getElementById("price").value = data.price || '';
            document.getElementById("image").value = data.image || '';

            const btn = document.getElementById("formSubmitBtn");
            btn.innerText = "Update Product";
            btn.setAttribute("onclick", `updateProduct(${id})`);
        })
        .catch(err => {
            console.error("Fetch error:", err);
            showMessage("Failed to load product data. Please try again.", "error");
        });
}

// Update product
async function updateProduct(id) {
    const name = document.getElementById("name").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const imageUrl = document.getElementById("image").value.trim();
    const imageFile = document.getElementById("imageFile").files[0];

    if (!name) {
        showMessage("Product name is required!", "error");
        return;
    }

    if (isNaN(price) || price < 0) {
        showMessage("Please enter a valid price!", "error");
        return;
    }

    let finalImageUrl = imageUrl;
    if (imageFile) {
        try {
            finalImageUrl = await uploadImage(imageFile); // upload lên Cloudinary
        } catch (err) {
            showMessage("Image upload failed!", "error");
            console.error(err);
            return;
        }
    }

    const updatedProduct = { name, price };
    if (finalImageUrl) {
        updatedProduct.image = finalImageUrl;
    }

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            console.log("Updated product:", data);
            showMessage("Product updated successfully!", "success");
            fetchProducts();
            resetForm();
            hideForm(new Event("click"));
        })
        .catch(err => {
            console.error("Update error:", err);
            showMessage("Failed to update product. Please try again.", "error");
        });
}


// Create product handler
async function createProduct() {
    const name = document.getElementById("name").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const imageFile = document.getElementById("imageFile").files[0]; // <-- file input

    if (!name) {
        showMessage("Product name is required!", "error");
        return;
    }

    if (isNaN(price) || price < 0) {
        showMessage("Please enter a valid price!", "error");
        return;
    }

    let finalImageUrl = "";
    if (imageFile) {
        try {
            finalImageUrl = await uploadImage(imageFile); // upload lên Cloudinary
        } catch (err) {
            showMessage("Image upload failed!", "error");
            console.error(err);
            return;
        }
    }

    const newProduct = { name, price };
    if (finalImageUrl) {
        newProduct.image = finalImageUrl;
    }

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
    })
        .then(res => res.json())
        .then(data => {
            console.log("Created product:", data);
            showMessage("Product created successfully!", "success");
            fetchProducts();
            resetForm();
            hideForm(new Event("click"));
        })
        .catch(err => {
            console.error("Create error:", err);
            showMessage("Failed to create product. Please try again.", "error");
        });
}
async function createProduct() {
    const name = document.getElementById("name").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const imageFile = document.getElementById("imageFile").files[0]; // <-- file input

    if (!name) {
        showMessage("Product name is required!", "error");
        return;
    }

    if (isNaN(price) || price < 0) {
        showMessage("Please enter a valid price!", "error");
        return;
    }

    let finalImageUrl = "";
    if (imageFile) {
        try {
            finalImageUrl = await uploadImage(imageFile); // upload lên Cloudinary
        } catch (err) {
            showMessage("Image upload failed!", "error");
            console.error(err);
            return;
        }
    }

    const newProduct = { name, price };
    if (finalImageUrl) {
        newProduct.image = finalImageUrl;
    }

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
    })
        .then(res => res.json())
        .then(data => {
            console.log("Created product:", data);
            showMessage("Product created successfully!", "success");
            fetchProducts();
            resetForm();
            hideForm(new Event("click"));
        })
        .catch(err => {
            console.error("Create error:", err);
            showMessage("Failed to create product. Please try again.", "error");
        });
}


// Reset form to default state
function resetForm() {
    document.getElementById("productForm").reset();
    document.getElementById("formTitle").innerText = "Create New Product";
    const btn = document.getElementById("formSubmitBtn");
    btn.innerText = "Create Product";
    btn.setAttribute("onclick", "createProduct()");
}

// Show form modal
function showForm(e) {
    document.getElementById('formOverlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
    e.preventDefault();
}

// Hide form modal
function hideForm(e) {
    document.getElementById('formOverlay').style.display = 'none';
    document.body.style.overflow = 'auto';
    resetForm();
    e.preventDefault();
}

// Close form when clicking outside
document.getElementById('formOverlay').addEventListener('click', function (e) {
    if (e.target === this) {
        hideForm(e);
    }
});

// Handle Enter key in form
document.getElementById('productForm').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const submitBtn = document.getElementById('formSubmitBtn');
        submitBtn.click();
    }
});

// Load table on start
fetchProducts();


async function uploadImage(file) {
    const cloudName = "dhqisfl4n"; // thay bằng cloud name
    const uploadPreset = "product_web_design"; // thay bằng preset đã tạo

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
    });

    if (!res.ok) {
        throw new Error("Failed to upload image");
    }

    const data = await res.json();
    return data.secure_url; // link ảnh
}
