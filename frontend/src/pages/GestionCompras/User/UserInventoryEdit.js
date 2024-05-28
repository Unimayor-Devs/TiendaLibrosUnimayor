import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookById, editBookAndInventory } from '../../../services/inventoryServices';
import '../../GestionLibros/User/AddBookScreen';

const UserInventoryEdit = () => {
  const navigate = useNavigate();
  const { bookId } = useParams(); // Obtener el ID del libro de los parámetros de la URL
  const [inventoryData, setInventoryData] = useState({
    invBookId: '', // Este campo debería ser bloqueado y generado automáticamente
    invCantStock: '',
    invStatus: 'Disponible', // Por defecto, el estado será 'Disponible'
    invDateAdd: new Date().toISOString().split('T')[0] // Fecha actual al guardar
  });
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const book = await getBookById(bookId); // Obtener información del libro por su ID
        setBookData(book);

        // Establecer los datos de inventario si existen en el libro
        const invBookId = book.invBookId || '';
        const invCantStock = book.invCantStock || '';
        const invStatus = book.invStatus || 'Disponible';

        setInventoryData({ invBookId, invCantStock, invStatus, invDateAdd: new Date().toISOString().split('T')[0] }); // Actualizar el estado con los datos obtenidos
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'invCantStock' && value < 0) {
      return;
    }
    setInventoryData({ ...inventoryData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmEdit = window.confirm('¿Está seguro de editar este libro del inventario?');
    if (confirmEdit) {
      try {
        await editBookAndInventory(bookId, inventoryData); // Editar el libro y actualizar su inventario
        console.log('Libro editado en el inventario:', inventoryData);
        alert('Libro editado en el inventario exitosamente');
        navigate('/inventory'); // Redirige al usuario de vuelta a la página del inventario
      } catch (error) {
        console.error('Error al editar libro en el inventario:', error);
      }
    }
  };

  const handleCancel = () => {
    navigate('/inventory'); // Si el usuario decide cancelar, simplemente lo redirigimos de vuelta a la página del inventario
  };

  return (
    <div className="edit-book-container">
      <h2>Editar Libro en Inventario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID del Libro</label>
          <input
            type="text"
            name="invBookId"
            value={inventoryData.invBookId}
            onChange={handleChange}
            readOnly // Bloqueado para edición
            required
          />
        </div>
        <div className="form-group">
          <label>Cantidad en Stock</label>
          <input
            type="number"
            name="invCantStock"
            value={inventoryData.invCantStock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Estado</label>
          <select
            className="form-select" // Añade una clase para el CSS
            name="invStatus"
            value={inventoryData.invStatus}
            onChange={handleChange}
            required
          >
            <option value="Disponible">Disponible</option>
            <option value="Oculto">Oculto</option>
            <option value="Agotado">Agotado</option>
          </select>
        </div>
        <button type="submit">Guardar Cambios</button>
        <button type="button" onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default UserInventoryEdit;
