import React from 'react';
import Navbar from '../../../components/Navbar';

const UserInventoryScreen = () => {
  // Datos simulados de inventario (esto puede ser dinámico obtenido de una API)
  const inventoryItems = [
    { id: 1, code: '001', title: 'Teclado', quantity: 20, price: 29.99 },
    { id: 2, code: '002', title: 'Mouse', quantity: 30, price: 14.99 },
    { id: 3, code: '003', title: 'Monitor', quantity: 10, price: 199.99 }
  ];

  return (
    <div>
      <Navbar/> {/* Renderiza la barra de navegación */}
      <h2>Inventario</h2>
      <ul>
        {inventoryItems.map(item => (
          <li key={item.id}>
            <strong>{item.title}</strong> - Cantidad: {item.quantity} - ${item.price} c/u
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserInventoryScreen;