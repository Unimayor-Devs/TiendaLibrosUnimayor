import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateUser, getUser } from '../../../services/userService';
import { getDocs, collection } from 'firebase/firestore';
import { firebaseFirestore } from '../../../services/FirebaseService';

const EditUserScreen = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    department: '',
    city: ''
  });
  const [departmentsList, setDepartmentsList] = useState([]);

  const fetchUser = async () => {
    try {
      const userData = await getUser(userId);
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        phoneNumber: userData.phoneNumber || '',
        department: userData.department || '',
        city: userData.city || ''
      });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const querySnapshot = await getDocs(collection(firebaseFirestore, 'departments'));
      const departments = querySnapshot.docs.map((doc) => doc.data().depName);
      setDepartmentsList(departments);
    } catch (error) {
      console.error('Error fetching departments:', error.message);
      // Manejar error en la obtención de departamentos
    }
  };

  useEffect(() => {
    fetchUser();
    fetchDepartments();
  }, [userId]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(userId, formData);
      alert('Usuario actualizado correctamente.');
      navigate('/users');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Hubo un error al actualizar el usuario.');
    }
  };

  const handleEditEmail = () => {
    navigate(`/users/${userId}/edit/email`);
  };

  const handleEditPassword = () => {
    navigate(`/users/${userId}/edit/password`);
  };

  return (
    <div className="users-container">
      <h2>Editar Usuario</h2>
      <form onSubmit={handleSubmit} className="users-content">
        <label>
          Nombre:
          <input type="text" value={formData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} />
        </label>
        <label>
          Apellido:
          <input type="text" value={formData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} />
        </label>
        <label>
          Correo Electrónico:
          <input type="email" value={formData.email} readOnly />
        </label>
        <label>
          Celular:
          <input type="text" value={formData.phoneNumber} onChange={(e) => handleInputChange('phoneNumber', e.target.value)} />
        </label>
        <label>
          Departamento:
          <select value={formData.department} onChange={(e) => handleInputChange('department', e.target.value)} required>
            <option value="" disabled>
              Selecciona un departamento
            </option>
            {departmentsList.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>
        </label>
        <label>
          Ciudad:
          <input type="text" value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} />
        </label>
        <button type="submit" className="edit-button">Guardar Cambios</button>
      </form>

      <div className="users-content">
        <button onClick={handleEditEmail} className="edit-button">Editar Correo</button>
      </div>

      <div className="users-content">
        <button onClick={handleEditPassword} className="edit-button">Cambiar Contraseña</button>
      </div>
      
      <div className="users-content">
        <button onClick={() => navigate('/users')} className="edit-button">Volver</button>
      </div>
    </div>
  );
};

export default EditUserScreen;
