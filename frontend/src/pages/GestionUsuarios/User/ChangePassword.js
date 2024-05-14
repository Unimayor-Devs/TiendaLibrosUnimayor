import React, { useState } from 'react';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      // Actualización exitosa
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrorMessage('');
      alert('Contraseña actualizada exitosamente');
      navigate(-1); // Vuelve a la página anterior
    } catch (error) {
      setErrorMessage('Error al actualizar la contraseña. Verifica tu contraseña actual.');
      console.error(error);
    }
  };

  return (
    <div className="password-container">
      <h2>Cambiar Contraseña</h2>
      <form onSubmit={handlePasswordChange} className="password-form">
        <div className="form-group">
          <label>Contraseña Actual:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirmar Nueva Contraseña:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="password-submit-button">Guardar</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div>
          <button type="button" className="password-cancel-button" onClick={() => navigate(-1)}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
