import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { auth } from './services/FirebaseService';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App auth={auth} /> {/* Pasa firebaseAuth como una prop a App */}
  </React.StrictMode>
);

reportWebVitals();
