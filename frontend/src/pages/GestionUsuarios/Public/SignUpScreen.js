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
  
    if (password !== passwordConfirmation) {
      setError('Las contraseñas no coinciden.');
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
      console.error('Error al registrar usuario:', error.message);
      setError('Error al registrar usuario. Por favor, inténtalo de nuevo.');
    }
  };  

  return (
    <div className="signup-container">
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSignUp}>
        <div className="input-container">
          <label>Nombre:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Nombre"
            required
          />
        </div>
        <div className="input-container">
          <label>Apellido:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Apellido"
            required
          />
        </div>
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
        <div className="input-container">
          <label>Verificar Contraseña:</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Verificar Contraseña"
            required
          />
        </div>
        <div className="input-container">
          <label>Teléfono:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Teléfono"
            required
          />
        </div>
        <div className="input-container">
          <label>Ciudad:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ciudad"
            required
          />
        </div>
        <div className="input-container">
          <label>Departamento:</label>
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
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default SignUpScreen;
