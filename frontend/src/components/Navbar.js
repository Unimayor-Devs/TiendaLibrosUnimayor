import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './Navbar.css'; // Importa los estilos CSS
import { useNavigate } from 'react-router-dom'; // Importa useNavigate desde react-router-dom

const Navbar = () => {
  const auth = getAuth(); // Obtener el objeto de autenticación de Firebase
  const navigate = useNavigate(); // Obtener la función navigate desde react-router-dom

  const handleSignOut = async () => {
    try {
      // Cerrar sesión utilizando signOut de Firebase
      await signOut(auth);
      console.log('Usuario cerró sesión exitosamente');

      // Redirigir a la página de inicio ("/") después del cierre de sesión
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };


  return (
    <nav className="Navbar">
      <ul>
        <li>
          <Link to="/home">Inicio</Link>
        </li>
        <li>
          <Link to="/users">Usuarios</Link>
        </li>
        <li>
          <Link to="/books">Libros</Link>
        </li>
        <li>
          <Link to="/inventory">Inventario</Link>
        </li>
        <li>
          <button className="logout-button" onClick={handleSignOut}>Salir</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
