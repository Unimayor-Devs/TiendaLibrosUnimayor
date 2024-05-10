import React from 'react';
import { Link } from 'react-router-dom';

function WelcomeScreen() {
  return (
    <div>
      <h1>Bienvenido a Tienda de Libros Unimayor</h1>
      <p>Seleccione una opción:</p>
      <ul>
        <li>
          <Link to="/sigin">Iniciar sesión</Link>
        </li>
        <li>
          <Link to="/signup">Registrarse</Link>
        </li>
      </ul>
    </div>
  );
}

export default WelcomeScreen;
