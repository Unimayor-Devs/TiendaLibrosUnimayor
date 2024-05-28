import React, { useState } from 'react';
import { addBook } from '../../../services/bookService';
import { useNavigate } from 'react-router-dom';
import './EditBookScreen.css';

const AddBookScreen = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    type: '',
    value: '',
    description: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    
    if (name === 'value') {
      // Remover cualquier caracter que no sea un dígito numérico o un punto
      newValue = newValue.replace(/[^\d.]/g, '');
      
      // Permitir solo un punto decimal
      const decimalCount = (newValue.match(/\./g) || []).length;
      if (decimalCount > 1) {
        newValue = newValue.slice(0, -1); // Eliminar el último carácter si hay más de un punto decimal
      }
    }
  
    setBookData({ ...bookData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convertir el valor a un número
      const numericValue = parseFloat(bookData.value.replace(/[^\d.]/g, ''));
      
      // Llama a la función addBook con el valor numérico
      await addBook({ ...bookData, value: numericValue });
      
      alert('Libro agregado exitosamente');
      setBookData({
        title: '',
        author: '',
        type: '',
        value: '',
        description: ''
      });
      navigate('/books');
    } catch (error) {
      console.error('Error al agregar el libro:', error);
      alert('Hubo un error al agregar el libro. Por favor, inténtalo de nuevo.');
    }
  };

  const handleCancel = () => {
    navigate('/books');
  };

  return (
    <div className="edit-book-container">
      <h2>Agregar Libro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título</label>
          <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Autor</label>
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Tipo</label>
          <input
            type="text"
            name="type"
            value={bookData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Valor</label>
          <input
            type="text"
            name="value"
            value={bookData.value}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="description"
            value={bookData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>URL de la Imagen</label>
          <input
            type="text"
            name="imageUrl"
            value={bookData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
          <button type="submit">Agregar Libro</button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default AddBookScreen;
