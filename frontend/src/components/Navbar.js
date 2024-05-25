import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate desde react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa FontAwesomeIcon
import { faHome, faUser, faBook, faBoxes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Importa íconos específicos
import './Navbar.css'; // Importa los estilos CSS
import logo from '/Users/ivanleonc/Documents/app_library_front/TiendaLibrosUnimayor/frontend/src/pages/Public/assets/logo.png'; 

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
      <div className="logo-container">
        <img src={logo} alt="Logo Unimayor" className="logo" />
        <p>Tienda de Libros Unimayor</p>
      </div>
      <ul>
        <li>
          <Link to="/home">
            <FontAwesomeIcon icon={faHome} /> Inicio
          </Link>
        </li>
        <li>
          <Link to="/users">
            <FontAwesomeIcon icon={faUser} /> Usuarios
          </Link>
        </li>
        <li>
          <Link to="/books">
            <FontAwesomeIcon icon={faBook} /> Libros
          </Link>
        </li>
        <li>
          <Link to="/inventory">
            <FontAwesomeIcon icon={faBoxes} /> Inventario
          </Link>
        </li>
        <li>
          <button className="logout-button" onClick={handleSignOut}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
