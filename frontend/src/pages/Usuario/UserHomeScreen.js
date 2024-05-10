import React from 'react';
import Navbar from '../../components/Navbar';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate desde react-router-dom

const HomeScreen = () => {
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
    <div>
      <Navbar /> {/* Renderiza la barra de navegación */}
      <h1>Bienvenidos a Tienda de Libros Unimayor</h1>
      <p>
        Esta es la página de inicio de nuestra tienda de libros. Aquí puedes encontrar una amplia selección de libros para explorar y comprar.
      </p>
      <p>
        ¡Explora nuestro catálogo y disfruta de la experiencia de compra en línea!
      </p>
      <button onClick={handleSignOut}>Cerrar Sesión</button>
      {/* Agrega un botón para cerrar sesión que llame a la función handleSignOut */}
    </div>
  );
};

export default HomeScreen;
