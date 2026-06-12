import React, { useState, useEffect } from 'react';

function Toast({ message, icon, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-notification" style={{ display: 'flex' }}>
      <div className="toast-icon">{icon || '🔔'}</div>
      <div className="toast-info">
        <h4>Notification</h4>
        <p>{message}</p>
      </div>
      <button className="toast-close" onClick={onClose}>Dismiss</button>
    </div>
  );
}

export default Toast;