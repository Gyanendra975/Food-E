// components/Modal.jsx
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <button style={modalStyles.closeButton} onClick={onClose}>X</button>
        {children}
      </div>
    </div>,
    document.getElementById('portal-root')
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    background: '#333',
    padding: '20px',
    borderRadius: '10px',
    position: 'relative',
    width: '90%',
    maxWidth: '800px',
    color: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    border: 'none',
    background: 'transparent',
    color: 'white',
    fontSize: '1.5rem',
    cursor: 'pointer',
  }
};

export default Modal;
