import React from 'react';
import Navbar from '../../components/Navbar';

const UserHomeScreen = () => {
  return (
    <div>
      <Navbar /> {/* Renderiza la barra de navegación */}
      <h1>Bienvenidos a Tienda de Libros Unimayor</h1>
      <p>
        Esta es la página de inicio de nuestra tienda de libros. Aquí puedes encontrar una amplia selección de libros para explorar y comprar.
      </p>
      <p>
        ¡Explora nuestro catálogo y disfruta de la experiencia de compra en línea!
      </p>
    </div>
  );
};

export default UserHomeScreen;
