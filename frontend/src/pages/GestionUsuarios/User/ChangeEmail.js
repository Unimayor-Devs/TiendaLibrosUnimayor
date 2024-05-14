import React, { useState } from 'react';
import { getAuth, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { updateUser } from '../../../services/userService';
import { useNavigate } from 'react-router-dom';

const ChangeEmail = () => {
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  const handleEmailChange = async () => {
    try {
      if (!user) {
        throw new Error('No hay usuario autenticado.');
      }

      navigate(-1); // Vuelve a la página anterior

      // Reautenticar al usuario con la contraseña actual antes de cambiar el correo electrónico
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);

      // Actualizar el correo electrónico en la autenticación de Firebase
      await updateEmail(user, newEmail);

      // Actualizar el correo electrónico en el documento de usuario en Firestore
      const userId = user.uid;
      await updateUser(userId, { email: newEmail });

      setSuccessMessage('¡Correo electrónico actualizado correctamente!');
      setError(null);
      setNewEmail('');
      setPassword(''); // Limpiar la contraseña después del cambio exitoso
    } catch (error) {
      setError('Error al actualizar el correo electrónico: ' + error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className="email-container">
      <h2>Cambiar Correo Electrónico</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form className="email-form">
        <label>Nuevo Correo Electrónico:</label>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <label>Contraseña:</label>
        <input
          type="password"
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
