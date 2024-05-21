import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
//import '../Users.css'; // Importa tu archivo de estilos CSS

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
          <div>
            <label>Ingrese su correo electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          {error && <p>{error}</p>}
          <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', padding: '10px 15px', cursor: 'pointer', transition: 'background-color 0.3s, opacity 0.3s', marginBottom: '10px' }}>Reestablecer Contraseña</button>
          <div>
            <button type="button" style={{ backgroundColor: '#6c757d', color: '#fff', borderRadius: '4px', padding: '10px 15px', cursor: 'pointer', transition: 'background-color 0.3s, opacity 0.3s' }} onClick={handleReturnToSignIn}>Volver</button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSignIn}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          {error && <p>{error}</p>}
          <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', padding: '10px 15px', cursor: 'pointer', transition: 'background-color 0.3s, opacity 0.3s', marginBottom: '10px' }}>Iniciar Sesión</button>
          <div>
            <a href="#" style={{ textAlign: 'center', textDecoration: 'none', color: '#007bff' }} onClick={handleShowForgotPassword}>Olvidé mi contraseña</a>
          </div>
        </form>
      )}
      {!showForgotPassword && (
        <div className="back-to-main-page">
          <button style={{ backgroundColor: '#6c757d', color: '#fff', borderRadius: '4px', padding: '10px 15px', marginTop: 10, cursor: 'pointer', transition: 'background-color 0.3s, opacity 0.3s' }} onClick={() => navigate('/')}>Volver a la página principal</button>
        </div>
      )}
    </div>
  );
};

export default SignInScreen;
