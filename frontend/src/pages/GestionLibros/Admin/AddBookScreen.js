import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import './style.css';

const AddBookScreen = () => {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    description: '',
    image: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para agregar el libro a la lista, por ejemplo:
    // setBooks([...books, newBook]);
    navigate('/admin-books-screen'); // Cambia la ruta a la pantalla de administración de libros
  };

  return (
    <div>
      <Navbar />
      <h2>Agregar Nuevo Libro</h2>
      <form className="add-book-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={newBook.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Autor"
          value={newBook.author}
          onChange={handleChange}
          required
        />
        <select
          name="genre"
          value={newBook.genre}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un género</option>
          <option value="Novela negra">Novela negra</option>
          <option value="Histórica">Histórica</option>
          <option value="Romántica">Romántica</option>
          <option value="Erótica">Erótica</option>
          <option value="Fantástica">Fantástica</option>
          <option value="Ciencia ficción">Ciencia ficción</option>
          <option value="Terror">Terror</option>
          <option value="Viajes">Viajes</option>
        </select>
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={newBook.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={newBook.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="URL de la imagen"
          value={newBook.image}
          onChange={handleChange}
          required
        />
        <button type="submit">Agregar Libro</button>
      </form>
    </div>
  );
};

export default AddBookScreen;