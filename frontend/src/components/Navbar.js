import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
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
          <Link to="/">Salir</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
