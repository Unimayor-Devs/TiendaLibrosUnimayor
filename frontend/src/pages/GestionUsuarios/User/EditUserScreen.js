import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateUser, getUser } from '../../../services/userService';
import { getDocs, collection } from 'firebase/firestore';
import { firebaseFirestore } from '../../../services/FirebaseService';
import { AuthContext } from '../../../context/AuthContext';
import '../Users.css';

const EditUserScreen = () => {
  const { user } = useContext(AuthContext);
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
  const [isAdmin, setIsAdmin] = useState(false); // Estado para controlar si el usuario es administrador

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
      setIsAdmin(userData.role === 'admin'); // Establecer isAdmin basado en el rol del usuario
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
  
    // Validar longitud del número de teléfono
    if (formData.phoneNumber.length !== 10) {
      alert('El número de teléfono debe tener exactamente 10 dígitos.');
      return;
    }
  
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
    <div className="edit-user-screen edit-users-container">
      <h2>Editar Mi Perfil</h2>
      <form onSubmit={handleSubmit} className="users-content">
        <div className="form-row">
          <label>
            Nombre:
            <input type="text" value={formData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} required />
          </label>
          <label>
            Apellido:
            <input type="text" value={formData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} required />
          </label>
        </div>
        <div className="form-row">
          <label>
            Correo Electrónico:
            <input type="email" value={formData.email} readOnly />
          </label>
          <label>
            Celular:
            <input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) => {
                const inputPhoneNumber = e.target.value.replace(/\D/g, ''); // Elimina caracteres que no sean dígitos
                const validatedPhoneNumber = inputPhoneNumber.slice(0, 10); // Limita a un máximo de 10 dígitos
                handleInputChange('phoneNumber', validatedPhoneNumber); // Actualiza el estado con el número validado
              }}
              placeholder="Teléfono"
              required
            />
          </label>
        </div>
        <div className="form-row">
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
            <input type="text" value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} required />
          </label>
        </div>
        <button type="submit" className="button button-primary">Guardar Cambios</button>
      </form>
  
      {userId === user.uid && ( // Renderizar solo si el usuario está editando su propio perfil
        <div className="users-content button-container">
          <button onClick={handleEditEmail} className="button button-primary">Cambiar Correo</button>
          <button onClick={handleEditPassword} className="button button-primary">Cambiar Contraseña</button>
        </div>
      )}
      
      <div className="users-content button-container">
        <button onClick={() => navigate('/users')} className="button button-secondary">Volver</button>
      </div>
    </div>
  );
}  

export default EditUserScreen;
