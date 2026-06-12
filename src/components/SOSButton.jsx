import React, { useState, useRef } from 'react';
import { sendSOSAlert, getCurrentLocation } from '../services/sosService';
import CallScreen from './CallScreen';

function SOSButton() {
  const [sosActive, setSosActive] = useState(false);
  const [timer, setTimer] = useState(5);
  const intervalRef = useRef(null);
  const [showCall, setShowCall] = useState(false);

  function playSiren() {
  const audio = new Audio('/siren.mp3');
  audio.volume = 1.0;
  audio.play();
}
  
  function startSOS() {
    setSosActive(true);
    setTimer(5);
    let count = 5;
    intervalRef.current = setInterval(() => {
      count--;
      setTimer(count);
     if (count <= 0) {
  clearInterval(intervalRef.current);
  setSosActive(false);
  playSiren();
  setShowCall(true);
  getCurrentLocation()
    .then(loc => sendSOSAlert(loc))
    .then(() => alert('🚨 SOS Sent! Emergency contacts notified!'))
    .catch(() => sendSOSAlert(null).then(() => alert('🚨 SOS Sent!')));
}
    }, 1000);
  }

  function cancelSOS() {
    clearInterval(intervalRef.current);
    setSosActive(false);
    setTimer(5);
  }

  return (
    <>
      {/* SOS Button */}
      <div className="sos-button" onClick={startSOS}>
        <div className="sos-text">SOS</div>
      </div>

      {/* SOS Timer Overlay */}
      {sosActive && (
        <div className="sos-overlay" style={{ display: 'flex' }}>
          <div className="sos-timer-card">
            <div className="sos-icon">🚨</div>
            <h3>Emergency SOS</h3>
            <p>SOS will be sent in</p>
            <div className="timer-display">{timer}</div>
            <button className="cancel-sos-btn" onClick={cancelSOS}>
              ❌ Cancel SOS
            </button>
          </div>
        </div>
      )}
      {showCall && <CallScreen onEnd={() => setShowCall(false)} />}
    </>
  );
}

export default SOSButton;