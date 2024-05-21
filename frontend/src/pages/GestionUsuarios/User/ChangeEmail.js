import React, { useState } from 'react';
import { updateUserEmail } from '../../../services/userService';
import { useNavigate } from 'react-router-dom';

const ChangeEmail = () => {
  const navigate = useNavigate(); // Obtenemos la función navigate
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

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

  return (
    <div className="email-container">
      <h2>Cambiar Correo Electrónico</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className="email-form">
        <label htmlFor="oldEmailInput">Correo Electrónico Actual:</label>
        <input
          type="email"
          id="oldEmailInput"
          name="oldEmail"
          value={oldEmail}
          onChange={(e) => setOldEmail(e.target.value)}
        />
        <label htmlFor="newEmailInput">Nuevo Correo Electrónico:</label>
        <input
          type="email"
          id="newEmailInput"
          name="newEmail"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <label htmlFor="passwordInput">Contraseña:</label>
        <input
          type="password"
          id="passwordInput"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="email-submit-button" onClick={handleEmailChange}>Guardar</button>
        <button className="email-cancel-button" type="button" onClick={() => navigate(-1)}>Cancelar</button>
      </form>
    </div>
  );
};

export default ChangeEmail;
