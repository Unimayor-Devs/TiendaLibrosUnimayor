import React, { useState } from 'react';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import '../Users.css';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  const validatePassword = (password) => {
    const errors = {};
  
    if (password.length < 8) {
      errors.lengthError = 'La contraseña debe tener al menos 8 caracteres.';
    }
  
    if (!/[a-z]/.test(password)) {
      errors.lowercaseError = 'La contraseña debe contener al menos una letra minúscula.';
    }
  
    if (!/[A-Z]/.test(password)) {
      errors.uppercaseError = 'La contraseña debe contener al menos una letra mayúscula.';
    }
  
    if (!/\d/.test(password)) {
      errors.numberError = 'La contraseña debe contener al menos un número.';
    }
  
    if (!/[^a-zA-Z0-9]/.test(password)) {
      errors.specialCharError = 'La contraseña debe contener al menos un carácter especial (por ejemplo, !@#$%^&*).';
    }
  
    if (/\s/.test(password)) {
      errors.spaceError = 'La contraseña no debe contener espacios.';
    }
  
    return errors;
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }
  
    const passwordErrors = validatePassword(newPassword);
  
    if (Object.keys(passwordErrors).length > 0) {
      // Construir mensaje de error combinando todos los errores
      const errorMessage = Object.values(passwordErrors).join(' ');
      setErrorMessage(errorMessage);
      return;
    }
  
    const auth = getAuth();
    const user = auth.currentUser;
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
      navigate(-1);
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
    <button className="button button-primary" type="submit">Guardar</button>
    <button className="email-cancel-button" type="button" onClick={() => navigate(-1)}>Cancelar</button>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
  </form>
</div>
  );
};

export default ChangePassword;
