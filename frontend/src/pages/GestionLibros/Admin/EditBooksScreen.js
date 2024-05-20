import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import './style.css';

const EditBooksScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extraer el objeto del libro de la ubicación
  const book = location.state?.book;

  // Estado para almacenar los detalles editados del libro
  const [editedBook, setEditedBook] = useState(book);

  // Función para manejar los cambios en los campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({ ...editedBook, [name]: value });
  };

  // Función para manejar la presentación del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí deberías realizar la lógica para guardar los cambios en el libro
    // Por ejemplo, puedes hacer una llamada a una API para actualizar el libro en la base de datos

    // Después de guardar los cambios, redirigir al usuario a la pantalla de administración de libros
    navigate('/admin-books-screen');
  };

  // Si no hay libro para editar, redirigir al usuario
  if (!book) {
    console.error("No se pasó ningún libro para editar");
    navigate('/admin-books-screen'); // Redirigir a la pantalla de administración de libros
    return null; // Evitar renderizar contenido si no hay libro
  }

  // Renderizar el formulario de edición
  return (
    <div>
      <Navbar />
      <h2>Editar Libro</h2>
      <form className="edit-book-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Título:</label>
        <input type="text" id="title" name="title" value={editedBook.title} onChange={handleChange} />
        
        <label htmlFor="author">Autor:</label>
        <input type="text" id="author" name="author" value={editedBook.author} onChange={handleChange} />
        
        <label htmlFor="genre">Género:</label>
        <input type="text" id="genre" name="genre" value={editedBook.genre} onChange={handleChange} />
        
        <label htmlFor="price">Precio:</label>
        <input type="number" id="price" name="price" value={editedBook.price} onChange={handleChange} />
        
        <label htmlFor="description">Descripción:</label>
        <textarea id="description" name="description" value={editedBook.description} onChange={handleChange} />
        
        <button type="submit">Confirmar</button>
      </form>
    </div>
  );
};

export default EditBooksScreen;
