import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft  } from 'react-icons/fa'; // Importa los iconos de Font Awesome
import './SignInScreen.css'; // Importa tu archivo de estilos CSS

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Nuevo estado para mostrar/ocultar contraseña
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Se ha enviado un correo electrónico para restablecer tu contraseña. Por favor, revisa tu bandeja de entrada.');
    } catch (error) {
      console.error('Error al enviar el correo electrónico de restablecimiento de contraseña:', error.message);
      setError('No se pudo enviar el correo electrónico de restablecimiento de contraseña. Por favor, inténtalo de nuevo.');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('Usuario inició sesión:', user);
      navigate('/home');
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
    }
  };

  const handleShowForgotPassword = () => {
    setShowForgotPassword(true);
    setError(null);
  };

  const handleReturnToSignIn = () => {
    setShowForgotPassword(false);
    setError(null);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Se ha enviado un correo electrónico para restablecer tu contraseña. Por favor, revisa tu bandeja de entrada.');
      setShowForgotPassword(false);
    } catch (error) {
      console.error('Error al enviar el correo electrónico de restablecimiento de contraseña:', error.message);
      setError('No se pudo enviar el correo electrónico de restablecimiento de contraseña. Por favor, inténtalo de nuevo.');
    }
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signin-container">
      <h1>{showForgotPassword ? 'Reestablecimiento de Contraseña' : 'Inicio de Sesión'}</h1>
      {showForgotPassword ? (
        <form onSubmit={handleResetPassword}>
          <div className="input-container">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          {error && <p>{error}</p>}
          <button type="submit" className="submit-button">Reestablecer Contraseña</button>
          <div>
            <button type="button" className="back-button" onClick={handleReturnToSignIn}>Volver</button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSignIn}>
          <div className="input-container">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="input-container">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'} // Usa el estado showPassword para alternar entre 'text' y 'password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
            {/* Agrega el icono de ojo para mostrar/ocultar la contraseña */}
            {showPassword ? (
              <FaEyeSlash className="password-toggle-icon" onClick={togglePasswordVisibility} />
            ) : (
              <FaEye className="password-toggle-icon" onClick={togglePasswordVisibility} />
            )}
          </div>
          {error && <p>{error}</p>}
          <button type="submit" className="submit-button">Iniciar Sesión</button>
          <div className="container-forgot-password">
            <a href="#" className="forgot-password-link" onClick={handleShowForgotPassword}>Olvidé mi contraseña</a>
          </div>
        </form>
      )}
      {!showForgotPassword && (
        <div className="back-to-main-page">
          <button className="back-button" onClick={() => navigate('/')}><FaArrowLeft  /> Volver a la página principal</button>
        </div>
      )}
    </div>
  );
};

export default SignInScreen;