import React from 'react';
import './ModalAlert.css';

const ModalAlert = ({ title, message, onConfirm, onCancel, showCancelButton }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="button confirm" onClick={onConfirm}>Aceptar</button>
          {showCancelButton && <button className="button cancel" onClick={onCancel}>Cancelar</button>}
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;
