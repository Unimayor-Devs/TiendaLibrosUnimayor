import React from 'react';
import Navbar from '../../components/Navbar';
import './Home.css'; // Importa el archivo de estilos CSS

const UserHomeScreen = () => {
  return (
    <div>
      <div>
        <Navbar /> {/* Renderiza la barra de navegación */}
      </div>
      <div className="user-home-container">
        <h1 className="user-home-title">Bienvenidos a Tienda de Libros Unimayor</h1>
        <p className="user-home-paragraph">
          Esta es la página de inicio de nuestra tienda de libros. Aquí puedes encontrar una amplia selección de libros para explorar y comprar.
        </p>
        <p className="user-home-paragraph">
          ¡Explora nuestro catálogo y disfruta de la experiencia de compra en línea!
        </p>
        <p className="user-home-highlight-paragraph">
          ¡Descubre las últimas novedades y ofertas especiales!
        </p>
      </div>
    </div>
    
  );
};

export default UserHomeScreen;
