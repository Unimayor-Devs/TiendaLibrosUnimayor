import React, { useState } from 'react';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // Importa los iconos de Font Awesome
import "../Public/SignInScreen.css";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Nuevo estado para mostrar/ocultar contraseña

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
      const errorMessage = Object.values(passwordErrors).join(' ');
      setErrorMessage(errorMessage);
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
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

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signin-container">
      <h2>Cambiar Contraseña</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handlePasswordChange} className="email-form">
        <div className="input-container">
          <FaLock className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Contraseña Actual"
            required
          />
          {showPassword ? (
            <FaEyeSlash className="password-toggle-icon" onClick={togglePasswordVisibility} />
          ) : (
            <FaEye className="password-toggle-icon" onClick={togglePasswordVisibility} />
          )}
        </div>
        <div className="input-container">
          <FaLock className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nueva Contraseña"
            required
          />
          {showPassword ? (
            <FaEyeSlash className="password-toggle-icon" onClick={togglePasswordVisibility} />
          ) : (
            <FaEye className="password-toggle-icon" onClick={togglePasswordVisibility} />
          )}
        </div>
        <div className="input-container">
          <FaLock className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar Nueva Contraseña"
            required
          />
          {showPassword ? (
            <FaEyeSlash className="password-toggle-icon" onClick={togglePasswordVisibility} />
          ) : (
            <FaEye className="password-toggle-icon" onClick={togglePasswordVisibility} />
          )}
        </div>
        <button className="button button-primary" type="submit">Guardar</button>
        <button className="button button-danger" type="button" onClick={() => navigate(-1)}>Cancelar</button>
      </form>
    </div>
  );
};

export default ChangePassword;
