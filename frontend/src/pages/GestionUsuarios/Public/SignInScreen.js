import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../Users.css'; // Importa tu archivo de estilos CSS

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
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

  return (
    <div className="signin-container">
      <h1>{showForgotPassword ? 'Reestablecimiento de Contraseña' : 'Inicio de Sesión'}</h1>
      {showForgotPassword ? (
        <form onSubmit={handleResetPassword}>
          <div className="input-container">
            <label>Ingrese su correo electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="password-submit-button">Reestablecer Contraseña</button>
          <div>
            <button type="button" className="password-cancel-button" onClick={handleReturnToSignIn}>Volver</button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSignIn}>
          <div className="input-container">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="input-container">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="signin-button">Iniciar Sesión</button>
          <div className="forgot-password">
            <a href="#" onClick={handleShowForgotPassword}>Olvidé mi contraseña</a>
          </div>
        </form>
      )}
      {!showForgotPassword && (
        <div className="return-button-container">
          <button className="return-button" onClick={() => navigate('/')}>Volver a la página principal</button>
        </div>
      )}
    </div>
  );
};

export default SignInScreen;
