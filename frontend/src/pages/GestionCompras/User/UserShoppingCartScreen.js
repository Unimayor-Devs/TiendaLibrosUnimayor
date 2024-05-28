import { useLocation } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { getAllBooks, deleteBook } from '../../../services/bookService';
import Navbar from '../../../components/Navbar';
import './UserShoppingCartScreen.css';
import './common-styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookJournalWhills, faCartShopping, faEdit, faPlus, faShop, faShoppingBag, faShoppingBasket, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaBuyNLarge } from 'react-icons/fa';

const UserShoppingCartScreen = () => {
  const location = useLocation();
  const { booksShopping: initialBooksShopping } = location.state || { booksShopping: [] };
  const [booksShopping, setBooksShopping] = useState(initialBooksShopping);

  const handleRemoveItem = (itemId) => {
    const updatedCart = booksShopping.filter(item => item.id !== itemId);
    setBooksShopping(updatedCart);
  };

  const formatCurrency = (value) => {
    return `$ ${value.toLocaleString()}`;
  };

  const handleCheckout = () => {
    // Simular la lógica de compra y limpiar el carrito
    alert('¡Compra realizada con éxito!');
    setBooksShopping([]);
  };

  const totalAmount = booksShopping.reduce((total, book) => total + book.titulo, 0);

  return (
    <div>
      <Navbar />
      <h1>Carrito de Compras</h1>
      <div className="user-books-container">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Libro</th>
                <th>Valor</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
            {booksShopping.length === 0 ? (
              <tr>
                <td colSpan="3" className="no-books-message">Aún no hay libros en el carrito.</td>
              </tr>
              ) : (
                booksShopping.map(book => (
                  <tr key={book.id}>
                    <td>{book.precio}</td>
                    <td>{book.titulo}</td>
                    <td>
                      <button className='btn btn-danger' onClick={() => handleRemoveItem(book.id)}>
                        Eliminar  <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td colspan="2">
                  <p>{formatCurrency(totalAmount)}</p>
                </td>
              </tr>
            </tfoot>
          </table>
          <button onClick={handleCheckout}>Realizar Compra</button>
        </div>
      </div>
    </div>
  );
};

export default UserShoppingCartScreen;

