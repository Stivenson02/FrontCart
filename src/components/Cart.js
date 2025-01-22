import React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Importamos useLocation

const Cart = ({ cart, setCart }) => {
  const location = useLocation(); // Obtener la ruta actual

  // Verificar si estamos en la vista de edición del carrito
  const isCartEditPage = location.pathname.startsWith('/cart_edit');

  // Función para confirmar el carrito y enviarlo al backend
  const confirmCart = async () => {
    try {
      const response = await axios.post('http://localhost:3000/carts', { product_items: cart });
      console.log('Carrito confirmado:', response.data);
      setCart([]);  // Limpiar el carrito después de confirmarlo
    } catch (error) {
      console.error('Error al confirmar el carrito:', error);
    }
  };

  return (
    <div>
      {cart.length > 0 && !isCartEditPage && ( 
      <h2>Carrito</h2>
    )}
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            Producto ID: {item.product_id} - Cantidad: {item.quantity}
          </li>
        ))}
      </ul>
      {cart.length > 0 && !isCartEditPage && (  // Solo mostrar "Confirmar carrito" si no estamos en la vista de edición
        <button onClick={confirmCart}>Confirmar carrito</button>
      )}
      {cart.length === 0 && !isCartEditPage && (  // Solo mostrar el mensaje "El carrito está vacío" si no estamos en la vista de edición
        <p>El carrito está vacío.</p>
      )}
    </div>
  );
};

export default Cart;
