import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllBooks, deleteBook } from '../../../services/bookService';
import Navbar from '../../../components/Navbar';
import './UserInventoryScreen.css';
import '../../GestionUsuarios/Users.css';
import { AuthContext } from '../../../context/AuthContext'; // Importa el contexto de autenticación
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookJournalWhills, faCartShopping, faEdit, faPlus, faShop, faShoppingBag, faShoppingBasket, faTrash } from '@fortawesome/free-solid-svg-icons';

const UserInventoryScreen = () => {
  
  //let booksShopping = [];
  const ShoppingBooks = []; 


  const navigate = useNavigate();
  const { userRole } = useContext(AuthContext); // Obtén el rol del usuario del contexto de autenticación
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (value) => {
    return `$ ${value.toLocaleString()}`;
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getAllBooks();
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const RemoveBookShop = async (bookID) =>{
    const idEliminar = bookID; // ID del elemento que deseas eliminar
    // Buscar el índice del elemento con el ID especificado
    let indiceElementoEliminar = null;
    for (let i = 0; i < ShoppingBooks.length; i++) {
      if (ShoppingBooks[i].id === idEliminar) {
        indiceElementoEliminar = i;
        break;
      }
    }
    // Eliminar el elemento si se encontró
    if (indiceElementoEliminar !== null) {
      ShoppingBooks.splice(indiceElementoEliminar, 1);
      console.log("Elemento eliminado con éxito");
    } else {
      console.log("No se encontró el elemento con el ID especificado");
    }   
  }
  class Libro {
    constructor(id, titulo, precio) {
      this.id = id;
      this.precio = precio;
      this.titulo = titulo;
    }
  };

  // Estado para almacenar los libros
  const [booksShopping, setBooksShopping] = useState([]);

  const addBookShop = async (bookID, bookTitle, BookPrice) =>{
    var book = new Libro(bookID, BookPrice, bookTitle);
    //booksShopping.push(book);
    setBooksShopping([...booksShopping, book]);
  }

  const handleDeleteBook = async (bookId, bookTitle) => {
    // Mostrar ventana de confirmación
    const confirmDelete = window.confirm(`¿Estás seguro de que quieres borrar este libro?`);
    
    if (confirmDelete) {
      try {
        await deleteBook(bookId);
        setBooks(books.filter(book => book.id !== bookId));
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
      <Navbar />
      <div className="user-books-container">
        <div className="table-container">
            <h3>Vista Previa Carrito</h3>
            <table className="table">
            <thead>
              <tr>
                <th>Libro</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
            {booksShopping.length === 0 ? (
              <tr>
                <td colSpan="2" className="no-books-message">Aún no hay libros para carrito.</td>
              </tr>
              ) : (
                booksShopping.map(book => (
                  <tr key={book.id}>
                    <td>{book.precio}</td>
                    <td>{book.titulo}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <h1>Inventario - Compras</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar libros..."
            value={searchTerm}
            onChange={handleSearch}
          />&nbsp;&nbsp;
          <button onClick={() => navigate('/cart', { state: { booksShopping } })}>
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
        </div>
        <div className="book-list">
          {sortedBooks.length === 0 ? (
            <p className="no-books-message">Aún no hay libros registrados.</p>
          ) : (
            sortedBooks.map(book => (
              <div key={book.id} className="book-card">
                <div className="book-info">
                  <h2>{book.title} - &#160;
                    <button onClick={() => addBookShop(book.id, book.title, book.value)}>
                      <FontAwesomeIcon icon={faShoppingBag}/>
                    </button>
                  </h2>
                  <p><strong>Autor:</strong> {book.author}</p>
                  <p><strong>Tipo:</strong> {book.type}</p>
                  <p className="precio"><strong>Valor:</strong> {formatCurrency(book.value)}</p>
                  <p><strong>Descripción:</strong> {book.description}</p>
                  {/* Mostrar la imagen utilizando la URL */}
                  {book.imageUrl && <img src={book.imageUrl} alt={book.title} className="card-image" />}
                </div>
                <div >
                  {userRole === 'admin' && (
                    <>
                      <Link to={`/books/${book.id}/edit`}>
                        <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                      </Link>
                      <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => handleDeleteBook(book.id)} />
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    // <div>
    //   <Navbar/> {/* Renderiza la barra de navegación */}
    //   <h2>Inventario</h2>
    //   <ul>
    //     {inventoryItems.map(item => (
    //       <li key={item.id}>
    //         <strong>{item.title}</strong> - Cantidad: {item.quantity} - ${item.price} c/u
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default UserInventoryScreen;