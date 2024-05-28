import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore'; // Importa Firestore
import { FaLock, FaEye, FaEyeSlash, FaUserCircle, FaEnvelope,FaPhone, FaBuilding, FaCity, FaArrowLeft  } from 'react-icons/fa';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState(null);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const db = getFirestore();

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

  const fetchDepartments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'departments'));
      const departments = querySnapshot.docs.map((doc) => doc.data().depName);
      setDepartmentsList(departments);
    } catch (error) {
      console.error('Error al obtener departamentos:', error.message);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (phoneNumber.length !== 10) {
      setError('El número de teléfono debe tener exactamente 10 dígitos.');
      return;
    }
  
    if (password !== passwordConfirmation) {
      setError('Las contraseñas no coinciden.');
      return;
    }
  
    const passwordErrors = validatePassword(password);
  
    if (Object.keys(passwordErrors).length > 0) {
      const errorMessage = Object.values(passwordErrors).join(' ');
  
      setError(errorMessage);
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);
  
      await setDoc(doc(db, 'users', user.uid), {
        userId: user.uid,
        firstName,
        lastName,
        email,
        phoneNumber,
        city,
        department,
      });
  
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setCity('');
      setDepartment('');
      setError(null);
  
      console.log('Usuario registrado:', user);
      console.log('Datos del usuario almacenados en la colección "users".');
      navigate('/home');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('El correo electrónico ya está en uso. Por favor, utiliza otro.');
      } else {
        console.error('Error al registrar usuario:', error.message);
        setError('Error al registrar usuario. Por favor, inténtalo de nuevo.');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signin-container">
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSignUp} className="signup-form">
        <div className="input-container">
          <FaUserCircle className="input-icon" />
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Nombre"
            required
          />
        </div>
        <div className="input-container">
          <FaUserCircle className="input-icon" />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Apellido"
            required
          />
        </div>
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
          <FaPhone  className="input-icon" />
          <input
            type="tel"
            pattern="[0-9]*"
            value={phoneNumber}
            onChange={(e) => {
              const validatedValue = e.target.value.replace(/\D/g, '');
              if (validatedValue.length <= 10) {
                setPhoneNumber(validatedValue);
              }
            }}
            placeholder="Teléfono"
            required
          />
        </div>
        <div className="input-container">
          <FaLock className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
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
        <div className="input-container">
          <FaLock className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Verificar Contraseña"
            required
          />
          {showPassword ? (
            <FaEyeSlash className="password-toggle-icon" onClick={togglePasswordVisibility} />
          ) : (
            <FaEye className="password-toggle-icon" onClick={togglePasswordVisibility} />
          )}
        </div>
        <div className="input-container">
          {/* <FaBuilding  className="input-icon" /> */}
          <select style={{ width: '98%', height: '36px', border: '1px solid #ccc', borderRadius: '5px'}}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option  value="" disabled>
              Selecciona un departamento
            </option>
            {departmentsList.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <FaCity  className="input-icon" />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ciudad"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Registrarse</button>
      </form>
      <div className="back-to-main-page">
        <button className="back-button" onClick={() => navigate('/')}><FaArrowLeft  /> Volver a la página principal</button>
      </div>
    </div>
  );
};

export default SignUpScreen;