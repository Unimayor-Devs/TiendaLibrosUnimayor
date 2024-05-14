import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Importa getFirestore para Firestore

// Configuración de la aplicación Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBUSI7-hARyG453lya7DiETbuwhkoYIhRE",
  authDomain: "tiendalibrosunimayor.firebaseapp.com",
  projectId: "tiendalibrosunimayor",
  storageBucket: "tiendalibrosunimayor.appspot.com",
  messagingSenderId: "703838305733",
  appId: "1:703838305733:web:8539fad7102b6090995fac",
  measurementId: "G-1ZNXRTNDPV"
};

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Obtener el objeto de autenticación (auth) de Firebase
const auth = getAuth(firebaseApp);

// Obtener el objeto de Firestore
const firebaseFirestore = getFirestore(firebaseApp);

// Exportar autenticación y Firestore
export { auth, firebaseFirestore };
