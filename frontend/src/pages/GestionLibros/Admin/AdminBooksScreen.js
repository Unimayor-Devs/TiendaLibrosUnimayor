import React from 'react';

const AdminBooksScreen = () => {
  // Datos simulados de libros (esto puede ser dinámico obtenido de una API)
  const books = [
    { id: 1, title: 'El principito', author: 'Antoine de Saint-Exupéry', genre: 'Fábula', price: 10.99 },
    { id: 2, title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes', genre: 'Novela', price: 15.99 },
    { id: 3, title: 'Cien años de soledad', author: 'Gabriel García Márquez', genre: 'Realismo mágico', price: 12.99 }
  ];

  return (
    <div>
      <h2>Lista de Libros</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <strong>{book.title}</strong> - {book.author} ({book.genre}) - ${book.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminBooksScreen;