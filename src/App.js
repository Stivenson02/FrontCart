import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const App = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  // Cargar los productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Mi tienda</h1>
      <ProductList products={products} cart={cart} setCart={setCart} />
      <Cart cart={cart} setCart={setCart} />
    </div>
  );
};

export default App;
