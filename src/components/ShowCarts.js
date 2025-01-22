import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShowCarts = () => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/carts');
        setCarts(response.data); 
      } catch (error) {
        console.error('Error al obtener los carritos:', error);
      }
    };

    fetchCarts();
  }, []);

  return (
    <div>
      <h2>Mis Carritos</h2>
      {carts.length > 0 ? (
        carts.map((cart) => (
          <div key={cart.id} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
            <h3>Carrito ID: {cart.id}</h3>
            <p>Total: ${cart.total}</p>
            <p>Cantidad de productos: {cart.quantity_products}</p>
            <h4>Productos:</h4>
            <ul>
              {cart.cart_items.map((item, index) => (
                <li key={index}>
                  <strong>{item.product.name}</strong> - ${item.product.price} - Cantidad: {item.quantity}
                </li>
              ))}
            </ul>
            <Link to={`/cart_edit/${cart.id}`}><button>Editar carrito</button></Link> {/* Botón para editar */}
          </div>
        ))
      ) : (
        <p>No hay carritos disponibles.</p>
      )}
    </div>
  );
};

export default ShowCarts;
