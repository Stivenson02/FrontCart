import React from 'react';

const ProductList = ({ products, cart, setCart }) => {
  const handleAddToCart = (product) => {
    const productInCart = cart.find((item) => item.product_id === product.id);

    if (productInCart) {
      // Si el producto ya está en el carrito, aumentamos la cantidad
      const updatedCart = cart.map((item) =>
        item.product_id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      // Si el producto no está en el carrito, lo agregamos con cantidad 1
      const newCartItem = {
        product_id: product.id,
        quantity: 1,
      };
      setCart([...cart, newCartItem]);
    }
  };

  return (
    <div>
      <h2>Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Precio: {product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Agregar al carrito</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
