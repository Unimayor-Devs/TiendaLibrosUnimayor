import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { firebaseAuth } from './services/FirebaseService'; // Importa firebaseAuth desde FirebaseService

// No es necesario inicializar la app de nuevo aquí si ya lo has hecho en FirebaseService

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App firebaseAuth={firebaseAuth} /> {/* Pasa firebaseAuth como una prop a App */}
  </React.StrictMode>
);

reportWebVitals();
