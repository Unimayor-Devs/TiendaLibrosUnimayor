import React, { useState } from 'react';

const AdminUsersScreen = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Juan', email: 'juan@example.com', city: 'Bogotá' },
    { id: 2, name: 'Maria', email: 'maria@example.com', city: 'Medellín' },
    { id: 3, name: 'Pedro', email: 'pedro@example.com', city: 'Cali' },
  ]);

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email} - Ciudad: {user.city}
            <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsersScreen;