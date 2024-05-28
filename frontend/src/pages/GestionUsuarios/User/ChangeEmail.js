import React, { useState } from 'react';
import { updateUserEmail } from '../../../services/userService';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // Importa los iconos de Font Awesome
import "../Public/SignInScreen.css";

const ChangeEmail = () => {
  const navigate = useNavigate(); // Obtenemos la función navigate
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Nuevo estado para mostrar/ocultar contraseña

  const handleEmailChange = async (e) => {
    e.preventDefault();
    try {
      // Verificar que los campos no estén vacíos
      if (!oldEmail || !newEmail || !password) {
        setError('Por favor, completa todos los campos.');
        return;
      }

      // Llamar a la función para actualizar el correo electrónico
      await updateUserEmail(oldEmail, password, newEmail);
      
      // Mostrar la alerta del navegador con el mensaje de éxito
      window.alert('¡Correo electrónico actualizado exitosamente!');

      // Vaciar los campos después de la actualización exitosa
      setOldEmail('');
      setNewEmail('');
      setPassword('');

      // Navegar a la página anterior
      navigate(-1);
    } catch (error) {
      setError('Error al actualizar el correo electrónico. Por favor, inténtalo de nuevo.');
    }
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signin-container">
      <h2>Cambiar Correo Electrónico</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleEmailChange} className="email-form">
        <div className="input-container">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            id="oldEmailInput"
            name="oldEmail"
            value={oldEmail}
            onChange={(e) => setOldEmail(e.target.value)}
            placeholder="Correo Electrónico Actual"
            required
          />
        </div>
        <div className="input-container">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            id="newEmailInput"
            name="newEmail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Nuevo Correo Electrónico"
            required
          />
        </div>
        <div className="input-container">
          <FaLock className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            id="passwordInput"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
          {showPassword ? (
            <FaEyeSlash className="password-toggle-icon" onClick={togglePasswordVisibility} />
          ) : (
            <FaEye className="password-toggle-icon" onClick={togglePasswordVisibility} />
          )}
        </div>
        <button type="submit" className="button button-primary">Guardar</button>
        <button type="button" className="button button-danger" onClick={() => navigate(-1)}>Cancelar</button>
      </form>
    </div>
  );
  
};

export default ChangeEmail;
