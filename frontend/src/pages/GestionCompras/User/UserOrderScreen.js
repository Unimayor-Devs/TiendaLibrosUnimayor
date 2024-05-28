import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrders } from '../../../services/ordersService';
import { getAllBooks } from '../../../services/bookService';
import { getUsers } from '../../../services/userService';
import './UserOrderScreen.css';

const formatCurrency = (value) => {
  return value ? `$ ${value.toLocaleString()}` : '';
};

const UserOrderScreen = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderBooks, setOrderBooks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener la orden
        const orders = await getOrders();
        const foundOrder = orders.find((order) => order.id === orderId);

        if (!foundOrder) {
          setError('Orden no encontrada');
          return;
        }

        setOrder(foundOrder);

        // Obtener todos los libros
        const books = await getAllBooks();

        // Filtrar los libros que están incluidos en la orden
        const orderBooksData = foundOrder.items.map((item) => {
          const book = books.find((book) => book.id === item.idLibro);
          return {
            ...item,
            ...book,
          };
        });
        setOrderBooks(orderBooksData);

        // Obtener la información del usuario por su ID
        const users = await getUsers();
        const foundUser = users.find((user) => user.id === foundOrder.idUsuario);

        if (!foundUser) {
          setError('Usuario no encontrado');
          return;
        }

        setUser(foundUser);
      } catch (error) {
        setError('Error al obtener la orden');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="order-container">
      <h1 className="order-summary">Resumen del Pedido</h1>
      <Link to="/inventory" className="checkout-button">Regresar a comercio</Link>
      <p></p>
      {order ? (
        <div className="order-column">
          {/* Información de la orden */}
          <div className='order-resume-container'>
            <div className="order-info">
              <h3>ID de la Orden:</h3>
              <p>{order.id}</p>
            </div>
            <div className="order-info">
              <h3>Fecha del Pedido:</h3>
              <p>{new Date(order.fechaPedido).toLocaleDateString()}</p>
            </div>
            <div className="order-info">
              <h3>Estado del Pedido:</h3>
              <p>{order.estadoPedido}</p>
            </div>
            <div className="order-info">
              <h3>Valor Parcial:</h3>
              <p>{formatCurrency(order.total - order.valorEnvio)}</p>
            </div>
            <div className="order-info">
              <h3>Valor del Envío:</h3>
              <p>{formatCurrency(order.valorEnvio)}</p>
            </div>
            <div className="order-info">
              <h3>Total:</h3>
              <p>{formatCurrency(order.total)}</p>
            </div>
          {/* Información del usuario */}
          {user && (
            <div className='order-column'>
              <div className="user-info">
                <h3>Nombre:</h3>
                <p>{user.firstName} {user.lastName}</p>
              </div>
              <div className="user-info">
                <h3>Teléfono:</h3>
                <p>{user.phoneNumber}</p>
              </div>
              <div className="user-info">
                <h3>Email:</h3>
                <p>{user.email}</p>
              </div>
              <div className="user-info">
                <h3>Departamento:</h3>
                <p>{user.department}</p>
              </div>
              <div className="user-info">
                <h3>Ciudad:</h3>
                <p>{user.city}</p>
              </div>
            </div>
          )}
          </div>

          {/* Lista de libros */}
          <div className='order-resume-container'>
            <h2 className="order-items-title">Items:</h2>
            <div className="order-items">
              {orderBooks.map((item, index) => (
                <div key={index} className="order-item">
                                    <div className="order-item-details">
                    <div className="book-card">
                      <div className="book-card-inside">
                        <div className="book-content">
                          <img src={item.imageUrl} alt={item.title} />
                          <div className="book-details">
                            <h2>{item.title}</h2>
                            <p><strong className="item-detail-label">Autor:</strong> {item.author}</p>
                            <p><strong className="item-detail-label">Tipo:</strong> {item.type}</p>
                            <p className="precio"><strong className="item-detail-label">Valor:</strong> {formatCurrency(item.value)}</p>
                            <p><strong className="item-detail-label">Cantidad:</strong> {item.cantidad}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>Orden no encontrada</div>
      )}
    </div>
  );
};

export default UserOrderScreen;
