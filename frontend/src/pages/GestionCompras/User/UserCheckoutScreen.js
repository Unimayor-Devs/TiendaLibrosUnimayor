import React, { useState } from 'react';

const UserCheckoutScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleCheckout = () => {
    // Simular la lógica de compra y limpiar el carrito
    alert('¡Compra realizada con éxito!');
    setCartItems([]);
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {cartItems.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          cartItems.map(item => (
            <li key={item.id}>
              <strong>{item.title}</strong> - Cantidad: {item.quantity} - ${item.price * item.quantity}
            </li>
          ))
        )}
      </ul>
      <button onClick={handleCheckout}>Realizar Compra</button>
    </div>
  );
};

export default UserCheckoutScreen;