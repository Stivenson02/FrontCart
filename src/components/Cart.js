import React from 'react';
import axios from 'axios';

const Cart = ({ cart, setCart }) => {
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
      <h2>Carrito</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            Producto ID: {item.product_id} - Cantidad: {item.quantity}
          </li>
        ))}
      </ul>
      {cart.length > 0 && (
        <button onClick={confirmCart}>Confirmar carrito</button>
      )}
      {cart.length === 0 && <p>El carrito está vacío.</p>}
    </div>
  );
};

export default Cart;
