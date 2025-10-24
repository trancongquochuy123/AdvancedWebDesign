import { useState } from 'react';
import ProductList from './components/productList';
import ProductForm from './components/productForm';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(false);

  const handleEdit = (product) => setSelectedProduct(product);
  const handleSuccess = () => {
    setReloadFlag(!reloadFlag);
    setSelectedProduct(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <ProductForm selectedProduct={selectedProduct} onSuccess={handleSuccess} />
      <hr />
      <ProductList key={reloadFlag} onEdit={handleEdit} />
    </div>
  );
}

export default App;
