import { useState, useEffect } from 'react';
import API from '../api/api';

function ProductForm({ selectedProduct, onSuccess }) {
    const [formData, setFormData] = useState({ name: '', price: '' });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (selectedProduct) {
            setFormData({ name: selectedProduct.name, price: selectedProduct.price });
            setImagePreview(selectedProduct.image || '');
            setImageFile(null);
        } else {
            setFormData({ name: '', price: '' });
            setImagePreview('');
            setImageFile(null);
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('price', formData.price);
            if (imageFile) {
                data.append('image', imageFile);
            }

            if (selectedProduct) {
                await API.put(`/products/${selectedProduct.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await API.post('/products', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            onSuccess();
            setFormData({ name: '', price: '' });
            setImageFile(null);
            setImagePreview('');
        } catch (err) {
            console.error('Error saving product:', err);
            alert('Failed to save product');
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>{selectedProduct ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Product name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="number"
                        name="price"
                        placeholder="Product price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        step="0.01"
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Product Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'block', marginTop: '5px' }}
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ marginTop: '10px', maxWidth: '200px', maxHeight: '200px' }}
                        />
                    )}
                </div>

                <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    {selectedProduct ? 'Update' : 'Add'}
                </button>
            </form>
        </div>
    );
}

export default ProductForm;