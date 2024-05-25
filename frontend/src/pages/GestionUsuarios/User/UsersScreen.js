import React, { useState, useEffect, useContext } from "react";
import {
  getUsers,
  deleteUser,
  deleteUserFromBackend,
  deleteUserFromFirestore,
} from "../../../services/userService";
import { useNavigate } from "react-router-dom";
import "./UsersScreen.css";
import { AuthContext } from "../../../context/AuthContext";
import Navbar from "../../../components/Navbar";
import { FaTrash, FaEdit  } from 'react-icons/fa';

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
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId, fullName) => {
    if (user && user.uid === userId) {
      const confirmDelete = window.confirm(
        `¿Estás seguro que quieres eliminar a "${fullName}"?`
      );
      if (confirmDelete) {
        try {
          const deleted = await deleteUser(userId);
          if (deleted) {
            if (userId === user.uid) {
              navigate("/");
            } else {
              setUsers(users.filter((user) => user.id !== userId));
            }
          }
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      }
    } else {
      alert("No tienes permisos para eliminar este usuario.");
    }
  };

  const handleEditUser = (userId) => {
    navigate(`/users/${userId}/edit`);
  };

  const handleAdminDeleteUser = async (userId, fullName) => {
    const confirmDelete = window.confirm(
      `¿Estás seguro que quieres eliminar permanentemente a "${fullName}"? Esta acción no se puede deshacer.`
    );
    if (confirmDelete) {
      try {
        await deleteUserFromBackend(userId);
        const firestoreDeleteResult = await deleteUserFromFirestore(userId);
        if (firestoreDeleteResult.success) {
          setUsers(users.filter((user) => user.id !== userId));
          console.log("Usuario eliminado permanentemente.");
        } else {
          console.error(
            "Error deleting user from Firestore:",
            firestoreDeleteResult.error
          );
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
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
                  {userRole === "admin" && (
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
                {users.map((u) => (
                  <tr key={u.id}>
                    {userRole === "admin" && (
                      <>
                        <td>{u.id}</td>
                        <td
                          style={{
                            color: u.role === "inhabilitado" ? "red" : "green",
                          }}
                        >
                          {u.role === "inhabilitado"
                            ? "Inhabilitado"
                            : "Habilitado"}
                        </td>
                      </>
                    )}
                    <td>
                      {u.firstName} {u.lastName}
                    </td>
                    <td>{u.email}</td>
                    <td>
                      {userRole === "admin" || (user && user.uid === u.id) ? (
                        <FaEdit
                          className="button-icon button-primary"
                          onClick={() => handleEditUser(u.id)}
                        />
                      ) : null}
                      {user && user.uid === u.id && userRole !== "admin" && (
                        <FaTrash
                          className="button-icon button-danger"
                          onClick={() =>
                            handleDeleteUser(
                              u.id,
                              `${u.firstName} ${u.lastName}`
                            )
                          }
                        />
                      )}
                      {userRole === "admin" && user && user.uid !== u.id && (
                        <FaTrash
                          className="button-icon button-danger"
                          onClick={() =>
                            handleAdminDeleteUser(
                              u.id,
                              `${u.firstName} ${u.lastName}`
                            )
                          }
                        />
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
};

export default UsersScreen;
