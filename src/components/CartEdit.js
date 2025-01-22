import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CartEdit = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/carts/${id}`);
        setCart(response.data);
      } catch (error) {
        console.error('Error al obtener el carrito:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchCart();
    fetchProducts();
  }, [id]);


  const addProductToCart = (product) => {
    const existingProduct = cart.cart_items.find((item) => item.product_id === product.id);

    if (existingProduct) {
      const updatedCart = {
        ...cart,
        cart_items: cart.cart_items.map((item) =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
      setCart(updatedCart);
    } else {
      const newCartItem = {
        product_id: product.id,
        quantity: 1,
        product,
      };
      setCart({
        ...cart,
        cart_items: [...cart.cart_items, newCartItem],
      });
    }
  };


  const removeProductFromCart = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/carts/${id}`, {
        data: { product_id: productId },
      });

      if (response.data.message) {
        alert(response.data.message);
        setCart(null);
        navigate('/show_carts'); 
      } else if (response.data.cart_items) {
        setCart((prevCart) => ({
          ...prevCart,
          ...response.data,
        }));
      } else {
        console.error('Respuesta del servidor no válida');
      }
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  const updateCart = async () => {
    try {
      const cartItems = cart.cart_items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      }));

      const response = await axios.put(`http://localhost:3000/carts/${id}`, {
        product_items: cartItems,
      });

      console.log('Carrito actualizado:', response.data);
      setCart(response.data);
      navigate('/show_carts');
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
          <p>Cantidad de productos: {cart.cart_items.reduce((sum, item) => sum + item.quantity, 0)}</p>
          <h4>Productos en el carrito:</h4>
          <ul>
            {cart.cart_items.map((item) => (
              <li key={item.product_id}>
                <strong>{item.product.name}</strong> - ${item.product.price} - Cantidad: {item.quantity}
                <button onClick={() => removeProductFromCart(item.product_id)}>Eliminar</button>
              </li>
            ))}
          </ul>

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

          <Link to="/show_carts">Volver a la lista de carritos</Link>
        </div>
      ) : (
        <p>Cargando carrito...</p>
      )}
    </div>
  );
};

export default CartEdit;
