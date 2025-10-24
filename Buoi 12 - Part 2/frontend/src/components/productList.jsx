import { useEffect, useState } from 'react';
import API from '../api/api';
import { Edit, Trash2, ImageOff } from 'lucide-react';

function ProductList({ onEdit }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
      alert('❌ Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('❌ Failed to delete product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="text-center text-gray-500 py-10">
        <span className="animate-pulse">Loading products...</span>
      </div>
    );

  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">📦 Product List</h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-left text-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => (
                <tr
                  key={p.id}
                  className="border-t hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-14 h-14 object-cover rounded-md border border-gray-200"
                      />
                    ) : (
                      <div className="flex items-center text-gray-400">
                        <ImageOff size={18} className="mr-1" /> No image
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-800">{p.name}</td>
                  <td className="py-3 px-4 text-blue-600 font-semibold">
                    ${parseFloat(p.price).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      onClick={() => onEdit(p)}
                      className="inline-flex items-center px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-white text-sm rounded-lg shadow-sm transition"
                    >
                      <Edit size={16} className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="inline-flex items-center px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg shadow-sm transition"
                    >
                      <Trash2 size={16} className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductList;
