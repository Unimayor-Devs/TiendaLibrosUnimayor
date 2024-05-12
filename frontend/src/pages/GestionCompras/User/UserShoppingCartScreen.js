import React, { useState } from 'react';

const UserShoppingCartScreen = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, title: 'Libro 1', price: 10.99, quantity: 1 },
    { id: 2, title: 'Libro 2', price: 12.99, quantity: 2 },
  ]);

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <strong>{item.title}</strong> - ${item.price} - Cantidad: {item.quantity}
            <button onClick={() => handleRemoveItem(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <p>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
    </div>
  );
};

export default UserShoppingCartScreen;
