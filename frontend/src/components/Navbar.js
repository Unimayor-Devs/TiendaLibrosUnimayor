import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBook, faBoxes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import logo from '../pages/Public/assets/logo.png';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { user, userRole } = useContext(AuthContext); // Usa el contexto de autenticación

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Usuario cerró sesión exitosamente');
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
            <FontAwesomeIcon icon={faBoxes} /> {userRole === 'admin' ? 'Inventario' : 'Comprar'}
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
