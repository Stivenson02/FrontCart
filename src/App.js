import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ShowCarts from './components/ShowCarts'; // Importamos el nuevo componente

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
    <Router>
      <div>
        <h1>Mi tienda</h1>
        <nav>
          <Link to="/">Ver productos</Link> | <Link to="/show_carts">Ver carritos</Link>  {/* Links de navegación */}
        </nav>
        
        <Routes>
          <Route path="/" element={<ProductList products={products} cart={cart} setCart={setCart} />} />
          <Route path="/show_carts" element={<ShowCarts />} /> {/* Ruta para los carritos */}
        </Routes>
        
        <Cart cart={cart} setCart={setCart} />
      </div>
    </Router>
  );
};

export default App;
