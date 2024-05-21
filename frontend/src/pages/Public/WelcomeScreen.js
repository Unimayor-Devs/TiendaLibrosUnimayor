import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'; // Importa iconos de Font Awesome
import './Welcome.css'; // Importa el archivo de estilos CSS

function WelcomeScreen() {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Bienvenido a Tienda de Libros Unimayor</h1>
      <p>Seleccione una opción:</p>
      <div>
        <Link className="welcome-button" to="/signin">
          <FaSignInAlt /> Iniciar sesión
        </Link>
        <Link className="welcome-button" to="/signup">
          <FaUserPlus /> Registrarse
        </Link>
      </div>
    </div>
  );
}

export default WelcomeScreen;