import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllBooks } from '../../../services/bookService';
import '../../GestionLibros/User/UserBookScreen.css';
import { AuthContext } from '../../../context/AuthContext'; // Importa el contexto de autenticación

const InventoryBooks = () => {
  const navigate = useNavigate();
  const { userRole } = useContext(AuthContext); // Obtén el rol del usuario del contexto de autenticación
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getAllBooks();
        const booksWithoutInvId = booksData.filter(book => !book.invBookId); // Filtrar libros sin invBookId
        setBooks(booksWithoutInvId);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCancel = () => {
    navigate('/inventory'); // Si el usuario decide cancelar, simplemente lo redirigimos de vuelta a la página del inventario
  };

  const formatCurrency = (value) => {
    return `$ ${value.toLocaleString()}`;
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBooks = filteredBooks.slice().sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  return (
    <div>
      <div className="user-books-container">
        <button className="button-primary" type="button" onClick={handleCancel}>Volver</button>
        <h1>Libros Registrados</h1>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Buscar libros..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-bar"
          />
        </div>
        <div className="book-list">
          {sortedBooks.length === 0 ? (
            <p className="no-books-message">Aún no hay libros registrados.</p>
          ) : (
            sortedBooks.map(book => (
              <Link key={book.id} to={`/inventory/books/${book.id}/add`} className="book-card">
                <div className="book-card-inside">
                  <div className="book-content">
                    <img src={book.imageUrl} alt={book.title} />
                    <div className="book-details">
                      <h2>{book.title}</h2>
                      <p><strong>Autor:</strong> {book.author}</p>
                      <p><strong>Tipo:</strong> {book.type}</p>
                      <p className="precio"><strong>Valor:</strong> {formatCurrency(book.value)}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryBooks;
