import React, { useState, useEffect } from 'react';
import { getBookById, editBook } from '../../../services/bookService';
import { useNavigate, useParams } from 'react-router-dom';
import './EditBookScreen.css';

const EditBookScreen = () => {
  const { bookId } = useParams(); // Obtener el ID del libro de los parámetros de la URL
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    type: '',
    value: '',
    description: '',
    imageUrl: ''
  });

  useEffect(() => {
    // Función para obtener la información del libro por su ID al cargar el componente
    const fetchBookData = async () => {
      try {
        const book = await getBookById(bookId); // Obtener información del libro por su ID
        setBookData(book); // Actualizar el estado con la información del libro
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, [bookId]); // Ejecutar efecto cuando cambie el ID

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'value') {
      // Asegúrate de que newValue es una cadena antes de usar replace
      newValue = String(newValue).replace(/[^\d.]/g, '');

      const decimalCount = (newValue.match(/\./g) || []).length;
      if (decimalCount > 1) {
        newValue = newValue.slice(0, -1);
      }
    }

    setBookData({ ...bookData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmEdit = window.confirm('¿Está seguro de editar este libro?');
    if (confirmEdit) {
      try {
        // Asegúrate de que bookData.value es una cadena antes de usar replace y convertir a número
        const numericValue = parseFloat(String(bookData.value).replace(/[^\d.]/g, ''));
        if (isNaN(numericValue)) {
          alert('El valor ingresado no es un número válido.');
          return;
        }
        await editBook(bookId, { ...bookData, value: numericValue });
        alert('Libro editado exitosamente');
        navigate('/books');
      } catch (error) {
        console.error('Error al editar el libro:', error);
        alert('Hubo un error al editar el libro. Por favor, inténtalo de nuevo.');
      }
    }
  };

  const handleCancel = () => {
    navigate('/books');
  };

  return (
    <div className="edit-book-container">
      <h2>Editar Libro</h2>
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
        <button type="submit">Guardar Cambios</button>
        <button type="button" onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditBookScreen;
