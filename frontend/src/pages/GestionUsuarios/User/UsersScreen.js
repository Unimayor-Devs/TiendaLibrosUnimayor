import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../../../services/userService';
import { useNavigate } from 'react-router-dom';
import '../Users.css';
import { getAuth } from 'firebase/auth'; // Importa getAuth de firebase/auth
import Navbar from '../../../components/Navbar';

const UsersScreen = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const auth = getAuth(); // Crea la instancia de autenticación
  const currentUser = auth.currentUser; // Obtiene el usuario actualmente autenticado

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId, fullName) => {
    if (currentUser && currentUser.emailVerified) {
      const confirmDelete = window.confirm(`¿Estás seguro que quieres eliminar a "${fullName}"?`);
      if (confirmDelete) {
        try {
          const deleted = await deleteUser(userId);
          if (deleted) {
            setUsers(users.filter(user => user.id !== userId));
          }
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    } else {
      alert('No tienes permisos para eliminar usuarios, verifica primero tu email.');
    }
  };

  const handleEditUser = (userId) => {
    navigate(`/users/${userId}/edit`);
  };
  
  return (
    <div>
      <Navbar /> {/* Renderiza la barra de navegación */}
      <div className="users-container"> {/* Contenedor principal con margen */}
        <div className="users-content"> {/* Contenido de usuarios con espacio interno */}
          <h1>Usuarios</h1> {/* Título de la página */}
          <div className="user-list">
            {users.map(user => (
              <div key={user.id} className="user-card">
                <div className="user-info">
                  <p>Nombre: {user.firstName} {user.lastName}</p>
                  <p>Correo: {user.email}</p>
                </div>
                {currentUser && currentUser.uid === user.id && (
                  <div className="user-actions">
                    <button className="edit-button" onClick={() => handleEditUser(user.id)}>Editar</button>
                    <button className="delete-button" onClick={() => handleDeleteUser(user.id, `${user.firstName} ${user.lastName}`)}>Borrar</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersScreen;
