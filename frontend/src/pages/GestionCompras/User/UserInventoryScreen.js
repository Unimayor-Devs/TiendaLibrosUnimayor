import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllBooks, updateBookStatus } from '../../../services/bookService';
import Navbar from '../../../components/Navbar';
import '../../GestionLibros/User/UserBookScreen.css';
import { AuthContext } from '../../../context/AuthContext'; // Importa el contexto de autenticación
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faShoppingCart, faCartPlus } from '@fortawesome/free-solid-svg-icons'; // Agrega el icono del carrito de compras
import CartView from './CartView'; // Importa el componente CartView
import "./UserInventoryScreen.css"

const UserInventoryScreen = () => {
  const navigate = useNavigate();
  const { userRole } = useContext(AuthContext); // Obtén el rol del usuario del contexto de autenticación
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]); // Estado para almacenar los libros en el carrito
  const [isCartVisible, setIsCartVisible] = useState(false); // Estado para controlar la visibilidad del carrito

  const formatCurrency = (value) => {
    return `$ ${value.toLocaleString()}`;
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getAllBooks();
        let filteredBooks = [];
  
        if (userRole === 'admin') {
          // Si el usuario es admin, mostrar todos los libros
          filteredBooks = booksData;
        } else {
          // Si el usuario no es admin, filtrar libros disponibles con invCantStock mayor que 0
          filteredBooks = booksData.filter(book => book.invCantStock >= 0 && book.invStatus === 'Disponible');
        }
  
        // Actualiza el estado de los libros agotados
        const booksToUpdate = booksData.filter(book => book.invCantStock <= 0 && book.invStatus !== 'Agotado');
        await Promise.all(booksToUpdate.map(book => updateBookStatus(book.id, 'Agotado')));
  
        setBooks(filteredBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
  
    fetchBooks();
  }, []);
  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter(book => {
    // Si el usuario es admin, mostrar todos los libros
    if (userRole === 'admin') {
      return (
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.invBookId.toLowerCase().includes(searchTerm.toLowerCase())||
        book.invStatus.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // Si el usuario no es admin, mostrar solo libros disponibles
      return (
        (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.invStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.invBookId.toLowerCase().includes(searchTerm.toLowerCase())) &&
        book.invStatus.toLowerCase() === 'disponible'
      );
    }
  });

  const sortedBooks = filteredBooks.slice().sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  const handleAddToCart = (bookId) => {
    const selectedBook = books.find(book => book.id === bookId);
    
    // Verificar si el libro ya está en el carrito
    const existingItem = cart.find(item => item.id === selectedBook.id);
    
    if (!existingItem) {
      // Si el libro no está en el carrito, agregarlo con una cantidad de 1
      setCart([...cart, { ...selectedBook, quantity: 1 }]);
      setIsCartVisible(true); // Hacer visible el CartView al agregar un libro al carrito
    }
  };

  const handleRemoveFromCart = (bookId) => {
    // Muestra un mensaje de confirmación
    const isConfirmed = window.confirm('¿Estás seguro de que deseas eliminar este libro del carrito?');
    
    // Si el usuario confirma, elimina el libro del carrito
    if (isConfirmed) {
      setCart(cart.filter(item => item.id !== bookId));
    }
  };

  const handleToggleCart = () => {
    setIsCartVisible(!isCartVisible); // Actualiza isCartVisible cuando se hace clic en el botón del carrito
  };

  return (
    <div>
      <Navbar />
      <div className="user-books-container">
        <h1>{userRole === 'admin' ? 'Inventario' : 'Comprar'}</h1>
        {userRole !== 'admin' && (
          <CartView 
            cart={cart} 
            setCart={setCart} // Asegúrate de pasar setCart aquí
            handleRemoveFromCart={handleRemoveFromCart} 
            isCartVisible={isCartVisible} 
            setIsCartVisible={setIsCartVisible} 
          />
        )}
        {userRole !== 'admin' && (
          <div className="cart-container">
            <button className="button button-primary button-carrito" onClick={handleToggleCart}>
              <FontAwesomeIcon icon={faShoppingCart} /> Carrito ({cart.length})
            </button>
          </div>
        )}
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Buscar libros..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-bar"
          />
          {userRole === 'admin' && (
            <button className="button button-primary" onClick={() => navigate('/inventory/books')}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
        </div>
        <div className="book-list">
          {sortedBooks.length === 0 ? (
            <p className="no-books-message">Aún no hay libros registrados.</p>
          ) : (
            sortedBooks.map(book => (
              <div key={book.id} className="book-card">
                <div className="book-card-inside">
                  <div className="book-actions">
                    {userRole === 'admin' && (
                      <>
                        <Link to={`/inventory/${book.id}/edit`} className="button button-primary">
                          <FontAwesomeIcon icon={faEdit}/>
                        </Link>
                      </>
                    )}
                    {userRole !== 'admin' && (
                      <button
                        className="button button-primary"
                        onClick={() => handleAddToCart(book.id)}
                      >
                        <FontAwesomeIcon icon={faCartPlus} /> {/* Icono de "Agregar al carrito" */}
                      </button>
                    )}
                  </div>
                  <div className="book-content">
                    <img src={book.imageUrl} alt={book.title} />
                    <div className="book-details">
                      <h2>{book.title}</h2>
                      <p><strong>Id Inventario:</strong> {book.invBookId}</p>
                      <p><strong>Autor:</strong> {book.author}</p>
                      <p><strong>Tipo:</strong> {book.type}</p>
                      <p className="precio"><strong>Valor:</strong> {formatCurrency(book.value)}</p>
                      <p><strong>Cantidad:</strong> {book.invCantStock}</p>
                      <p><strong>Estado:</strong> {book.invStatus}</p>
                      <p><strong>Actualización:</strong> {book.invDateAdd}</p>
                    </div>
                  </div>
                  <div className="book-description">
                    <p>{book.description}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInventoryScreen;
