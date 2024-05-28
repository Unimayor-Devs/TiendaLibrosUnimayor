/*
import React, { useState, useEffect, useContext } from 'react';
import { getUsers, deleteUser, deleteUserRoleField } from '../../../services/userService';
import { useNavigate } from 'react-router-dom';
import '../Users.css';
import { AuthContext } from '../../../context/AuthContext'; 
import Navbar from '../../../components/Navbar';
import { updateUserRole } from '../../../services/userService'; 

const UsersScreen = () => {
  const navigate = useNavigate();
  const { user, userRole } = useContext(AuthContext); 
  const [users, setUsers] = useState([]);

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
    // Verifica si el usuario actual tiene permisos para eliminar usuarios
    if (user && user.uid === userId) {
      const confirmDelete = window.confirm(`¿Estás seguro que quieres eliminar a "${fullName}"?`);
      if (confirmDelete) {
        try {
          const deleted = await deleteUser(userId);
          if (deleted) {
            if (userId === user.uid) {
              // Redirige al usuario a la página de inicio de sesión
              navigate('/');
            } else {
              // Filtra los usuarios para actualizar la lista
              setUsers(users.filter(user => user.id !== userId));
            }
          }
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    } else {
      alert('No tienes permisos para eliminar este usuario.');
    }
  };

  const handleEditUser = (userId) => {
    navigate(`/users/${userId}/edit`);
  };

  const handleToggleUserStatus = async (userId, fullName, currentRole) => {
    // Verifica si el usuario actual tiene permisos para cambiar el estado del usuario
    if (userRole === 'admin') {
      const confirmToggle = window.confirm(`¿Estás seguro que quieres ${currentRole === 'inhabilitado' ? 'habilitar' : 'inhabilitar'} a "${fullName}"?`);
      if (confirmToggle) {
        try {
          if (currentRole === 'inhabilitado') {
            // Elimina el campo "role" del documento del usuario
            await deleteUserRoleField(userId);
          } else {
            // Actualiza el rol del usuario a "inhabilitado"
            await updateUserRole(userId, 'inhabilitado');
          }
          // Actualiza la lista de usuarios después de cambiar el estado
          setUsers(users.map(u => u.id === userId ? { ...u, role: currentRole === 'inhabilitado' ? undefined : 'inhabilitado' } : u));
        } catch (error) {
          console.error('Error toggling user status:', error);
        }
      }
    } else {
      alert('No tienes permisos para cambiar el estado de usuarios.');
    }
  };
  
  
  return (
    <div>
      <Navbar />
      <div className="users-container users-screen">
        <div className="users-content">
          <h1>Usuarios</h1>
          <div className="user-list-table-container">
            <table className="user-list-table">
              <thead className="sticky-header">
                <tr>
                  {userRole === 'admin' && (
                    <>
                      <th>UID</th>
                      <th>Estado</th>
                    </>
                  )}
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  {userRole === 'admin' && (
                    <>
                      <td>{u.id}</td>
                      <td style={{ color: u.role === 'inhabilitado' ? 'red' : 'green' }}>
                        {u.role === 'inhabilitado' ? 'Inhabilitado' : 'Habilitado'}
                      </td>
                    </>
                  )}
                  <td>{u.firstName} {u.lastName}</td>
                  <td>{u.email}</td>
                  <td>
                    {userRole === 'admin' || (user && user.uid === u.id) ? (
                      <button className="button button-primary" onClick={() => handleEditUser(u.id)}>
                        {user && user.uid === u.id ? 'Mi perfil' : 'Editar'}
                      </button>
                    ) : null}
                    {userRole === 'admin' && user && user.uid !== u.id && (
                      <button className={`button ${u.role === 'inhabilitado' ? 'button-green' : 'button-danger'}`} onClick={() => handleToggleUserStatus(u.id, `${u.firstName} ${u.lastName}`, u.role)}>
                        {u.role === 'inhabilitado' ? 'Habilitar' : 'Inhabilitar'}
                      </button>
                    )}
                    {user && user.uid === u.id && userRole !== 'admin' && (
                      <button className="button button-danger" onClick={() => handleDeleteUser(u.id, `${u.firstName} ${u.lastName}`)}>Borrar</button>
                    )}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersScreen;
*/
import React, { useState, useEffect, useContext } from 'react';
import { getUsers, deleteUser, deleteUserRoleField } from '../../../services/userService';
import { useNavigate } from 'react-router-dom';
import './UsersScreen.css';
import { AuthContext } from '../../../context/AuthContext'; 
import Navbar from '../../../components/Navbar';
import { updateUserRole } from '../../../services/userService';
import { deleteUserFromBackend, deleteUserFromFirestore  } from '../../../services/userService';
import userService from '../../../services/userService'; 
import { FaTrash, FaEdit, FaUser } from 'react-icons/fa';
import DataTable from 'react-data-table-component';

const UsersScreen = () => {
  const navigate = useNavigate();
  const { user, userRole } = useContext(AuthContext); 
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleEditUser = (userId) => {
    navigate(`/users/${userId}/edit`);
  };

  /*
  const handleToggleUserStatus = async (userId, fullName, currentRole) => {
    // Verifica si el usuario actual tiene permisos para cambiar el estado del usuario
    if (userRole === 'admin') {
      const confirmToggle = window.confirm(`¿Estás seguro que quieres ${currentRole === 'inhabilitado' ? 'habilitar' : 'inhabilitar'} a "${fullName}"?`);
      if (confirmToggle) {
        try {
          if (currentRole === 'inhabilitado') {
            // Elimina el campo "role" del documento del usuario
            await deleteUserRoleField(userId);
          } else {
            // Actualiza el rol del usuario a "inhabilitado"
            await updateUserRole(userId, 'inhabilitado');
          }
          // Actualiza la lista de usuarios después de cambiar el estado
          setUsers(users.map(u => u.id === userId ? { ...u, role: currentRole === 'inhabilitado' ? undefined : 'inhabilitado' } : u));
        } catch (error) {
          console.error('Error toggling user status:', error);
        }
      }
    } else {
      alert('No tienes permisos para cambiar el estado de usuarios.');
    }
  };
  */

  const handleAdminDeleteUser = async (userId, fullName) => {
    const confirmDelete = window.confirm(`¿Estás seguro que quieres eliminar permanentemente a "${fullName}"? Esta acción no se puede deshacer.`);
    if (confirmDelete) {
      try {
        // Eliminar usuario del backend
        await deleteUserFromBackend(userId);
        
        // Eliminar usuario de Firestore
        const firestoreDeleteResult = await deleteUserFromFirestore(userId);
        if (firestoreDeleteResult.success) {
          // Si se eliminó correctamente de Firestore, actualizar el estado de los usuarios en el frontend
          setUsers(users.filter(user => user.id !== userId));
          console.log('Usuario eliminado permanentemente.');
        } else {
          console.error('Error deleting user from Firestore:', firestoreDeleteResult.error);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.lastName.toLowerCase().includes(lowerCaseSearchTerm) ||
      fullName.includes(lowerCaseSearchTerm) ||
      user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.department.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.city.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.phoneNumber.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (a.id === user.uid) return -1; // Move current user to the top
    if (b.id === user.uid) return 1;
    return 0;
  });

  const columns = [
    userRole === 'admin' && { name: 'UID', selector: row => row.id, sortable: true },
    { name: 'Nombre', selector: row => `${row.firstName} ${row.lastName}`, sortable: true },
    { name: 'Correo', selector: row => row.email, sortable: true },
    { name: 'Telefono', selector: row => row.phoneNumber, sortable: true },
    { name: 'Departamento', selector: row => row.department, sortable: true },
    { name: 'Ciudad', selector: row => row.city, sortable: true },
    userRole === 'admin' && {
      name: 'Acciones',
      cell: row => (
        user.uid !== row.id && (
          <>
            <FaEdit
              className="button button-icon button-primary"
              onClick={() => handleEditUser(row.id)}
            />
            <FaTrash
              className="button button-icon button-danger"
              onClick={() => handleAdminDeleteUser(row.id, `${row.firstName} ${row.lastName}`)}
            />
          </>
        )
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ].filter(Boolean);

  return (
    <div>
      <Navbar />
      <div className="users-container">
        <div>
          <h1>Usuarios</h1>
          <div>
            <div className="search-bar-container">
              <input
                type="text"
                placeholder="Buscar usuarios..."
                className="search-bar"
                value={searchTerm}
                onChange={handleSearch}
              />
              {user && (
                <button
                  className="button button-primary"
                  onClick={() => handleEditUser(user.uid)}
                >
                  <FaUser />
                </button>
              )}
            </div>
          </div>
          <div className="user-list-table-container">
            <DataTable
              columns={columns}
              data={sortedUsers}
              noDataComponent={<div>No se encontraron coincidencias con su búsqueda</div>}
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: 'rgba(140, 103, 81, 1)',
                    color: 'white',
                  },
                },
                rows: {
                  style: {
                    '&:nth-child(odd)': {
                      backgroundColor: '#f2f2f2',
                    },
                    '&:hover': {
                      backgroundColor: '#ddd',
                    },
                  },
                },
              }}
              highlightOnHover
              pointerOnHover
              striped
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersScreen;