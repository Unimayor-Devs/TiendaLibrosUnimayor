import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore'; // Importa Firestore

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
  const auth = getAuth();
  const navigate = useNavigate();
  const db = getFirestore(); // Obtiene una referencia a Firestore

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

  // Función para obtener la lista de departamentos desde Firestore
  const fetchDepartments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'departments'));
      const departments = querySnapshot.docs.map((doc) => doc.data().depName);
      setDepartmentsList(departments);
    } catch (error) {
      console.error('Error al obtener departamentos:', error.message);
      // Manejar error en la obtención de departamentos
    }
  };

  useEffect(() => {
    // Llamar a la función para obtener la lista de departamentos al cargar el componente
    fetchDepartments();
  }, []); // Se ejecuta solo una vez al cargar el componente

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validar longitud del número de teléfono
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
      // Construir mensaje de error combinando todos los errores
      const errorMessage = Object.values(passwordErrors).join(' ');
  
      setError(errorMessage);
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Enviar correo de verificación al usuario
      await sendEmailVerification(user);
  
      // Crear un nuevo documento en la colección "users" con el UID del usuario como ID de documento
      await setDoc(doc(db, 'users', user.uid), {
        userId: user.uid,
        firstName,
        lastName,
        email,
        phoneNumber,
        city,
        department,
      });
  
      // Reiniciar campos después del registro
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
        // Correo electrónico ya en uso
        setError('El correo electrónico ya está en uso. Por favor, utiliza otro.');
      } else {
        // Otro tipo de error
        console.error('Error al registrar usuario:', error.message);
        setError('Error al registrar usuario. Por favor, inténtalo de nuevo.');
      }
    }
  };  

  return (
    <div className="signup-container">
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSignUp} className="signup-form">
        <div className="form-row">
          <div className="form-group">
            <label>Nombre <span className="span-text-color">*</span></label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Nombre"
              required
            />
          </div>
          <div className="form-group">
            <label>Apellido <span className="span-text-color">*</span></label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Apellido"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Email <span className="span-text-color">*</span></label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label>Teléfono <span className="span-text-color">*</span></label>
            <input
              type="tel"
              pattern="[0-9]*"
              value={phoneNumber}
              onChange={(e) => {
                const validatedValue = e.target.value.replace(/\D/g, ''); // Eliminar caracteres que no sean números
                if (validatedValue.length <= 10) {
                  setPhoneNumber(validatedValue); // Actualizar el estado solo si la longitud es válida
                }
              }}
              placeholder="Teléfono"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Contraseña <span className="span-text-color">*</span></label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="form-group">
            <label>Verificar Contraseña <span className="span-text-color">*</span></label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Verificar Contraseña"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Departamento <span className="span-text-color">*</span></label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="" disabled>
                Selecciona un departamento
              </option>
              {departmentsList.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Ciudad <span className="span-text-color">*</span></label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ciudad"
              required
            />
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="button-container">
          <button type="submit" className="button button-primary">Registrarse</button>
        </div>
      </form>
      <div className="back-to-main-page">
        <button className="button button-secondary" onClick={() => navigate('/')}>Volver a la página principal</button>
      </div>
    </div>
  );
};

export default SignUpScreen;
