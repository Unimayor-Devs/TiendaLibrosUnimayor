import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import SearchBar from './SearchBar';
import './style.css';

const initialBooks = [
  {
    title: 'El principito',
    author: 'Antoine de Saint-Exupéry',
    genre: 'Fábula',
    price: 10.99,
    description: 'Un cuento clásico sobre un niño que viaja a otros planetas y aprende sobre la vida y la amistad.',
    image: 'https://example.com/book1.jpg',
  },
  {
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    genre: 'Novela',
    price: 15.99,
    description: 'Una obra maestra de la literatura española sobre un caballero andante y su fiel escudero.',
    image: 'https://example.com/book2.jpg',
  },
  {
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    genre: 'Realismo mágico',
    price: 12.99,
    description: 'Una novela épica sobre una familia en un pueblo ficticio de Macondo.',
    image: 'https://example.com/book3.jpg',
  },
  {
    title: 'El Alquimista',
    author: 'Paulo Coelho',
    genre: 'Novela',
    price: 14.99,
    description: 'Un viaje de autodescubrimiento y búsqueda del tesoro en la antigua Persia.',
    image: 'https://example.com/book4.jpg',
  },
  {
    title: 'Cumbres borrascosas',
    author: 'Emily Brontë',
    genre: 'Novela romántica',
    price: 13.99,
    description: 'Una historia de amor apasionado y venganza en la Inglaterra del siglo XIX.',
    image: 'https://example.com/book5.jpg',
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Distopía',
    price: 11.99,
    description: 'Una novela sobre un régimen totalitario que controla todos los aspectos de la vida.',
    image: 'https://example.com/book6.jpg',
  },
];

const AdminBooksScreen = () => {
  const [books, setBooks] = useState(initialBooks);
  const [searchResults, setSearchResults] = useState(initialBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const addNewBook = () => {
    navigate('/add-books-screen');
  };

  const deleteBook = (index) => {
    const updatedBooks = books.filter((book, i) => i !== index);
    setBooks(updatedBooks);
    setSearchResults(updatedBooks.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase())));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setSearchResults(books);
    } else {
      setSearchResults(books.filter(book => book.title.toLowerCase().includes(query.toLowerCase())));
    }
  };

  const editBook = (book) => {
    // Navegar a la pantalla de edición pasando el objeto del libro como una prop
    navigate('/edit-books-screen', { state: { book } });
  };

  return (
    <div>
      <Navbar />
      <h2>Lista de Libros</h2>
      <div className="search-bar-container">
        <SearchBar onSearch={handleSearch} />
        <button className="add-button" onClick={addNewBook}>Agregar Nuevo Libro</button>
      </div>
      {searchResults.length === 0 && (
        <p className="search-result-message">No se encontraron resultados para la búsqueda.</p>
      )}
      <div className="container">
        {searchResults.map((book, index) => (
          <div key={index} className={`cuadro cuadro${index + 1}`}>
            <img src={book.image} alt={`Imagen del libro ${book.title}`} />
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <span className="precio">${book.price}</span>
            <div className="button-group">
              <button className="edit-button" onClick={() => editBook(book)}>Editar</button>
              <button className="delete-button" onClick={() => deleteBook(index)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBooksScreen;
