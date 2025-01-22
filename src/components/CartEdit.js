import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CartEdit = () => {
  const { id } = useParams(); // Obtener el ID del carrito desde la URL
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Para redirigir a la página de show_carts

  // Cargar el carrito a editar
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/carts/${id}`);
        setCart(response.data);
      } catch (error) {
        console.error('Error al obtener el carrito:', error);
      }
    };

    fetchCart();  // Llamar para cargar el carrito

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProducts();  // Llamar para cargar los productos
  }, [id]);

  // Función para agregar productos al carrito
  const addProductToCart = (product) => {
    const existingProduct = cart.cart_items.find((item) => item.product_id === product.id); // Verificar si el producto ya está en el carrito

    if (existingProduct) {
      // Si el producto ya está en el carrito, solo actualizamos la cantidad
      const updatedCart = {
        ...cart,
        cart_items: cart.cart_items.map((item) =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + 1 } // Aumentamos la cantidad
            : item
        ),
      };
      setCart(updatedCart);
    } else {
      // Si el producto no está en el carrito, lo agregamos con cantidad 1
      const newCartItem = {
        product_id: product.id,
        quantity: 1,
        product: product,  // Agregar el objeto completo del producto
      };
      setCart({
        ...cart,
        cart_items: [...cart.cart_items, newCartItem],
      });
    }
  };

  // Función para actualizar el carrito en el backend
  const updateCart = async () => {
    try {
      const cartItems = cart.cart_items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
      }));

      const response = await axios.put(`http://localhost:3000/carts/${id}`, {
        product_items: cartItems,
      });
      
      // Verificar que la respuesta tenga la propiedad cart_items
      if (response.data && response.data.cart_items) {
        console.log('Carrito actualizado:', response.data);
        setCart(response.data); // Actualiza el estado con la respuesta del backend
        navigate('/show_carts'); // Redirigir a la página show_carts
      } else {
        console.error('Respuesta del servidor no válida');
      }
    } catch (error) {
      console.error('Error al actualizar el carrito:', error);
    }
  };

  return (
    <div>
      <h2>Editar Carrito</h2>
      {cart ? (
        <div>
          <h3>Carrito ID: {cart.id}</h3>
          <p>Total: ${cart.total}</p>
          <p>Cantidad de productos: {cart.quantity_products}</p>
          <h4>Productos en el carrito:</h4>
          <ul>
            {cart.cart_items.map((item, index) => (
              <li key={index}>
                <strong>{item.product.name}</strong> - ${item.product.price} - Cantidad: {item.quantity}
              </li>
            ))}
          </ul>

          {/* Botón para actualizar el carrito */}
          <button onClick={updateCart}>Actualizar Carrito</button>

          <h4>Agregar productos al carrito</h4>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <strong>{product.name}</strong> - ${product.price}
                <button onClick={() => addProductToCart(product)}>Agregar al carrito</button>
              </li>
            ))}
          </ul>

        </div>
      ) : (
        <p>Cargando carrito...</p>
      )}
    </div>
  );
};

export default CartEdit;
