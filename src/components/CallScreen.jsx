import React, { useState, useEffect, useRef } from 'react';

function CallScreen({ onEnd }) {
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState('Connecting to Police...');
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setStatus('Connected ✅'), 2000);
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  function formatTime(s) {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
      zIndex: 5000, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', color: 'white'
    }}>
      <div style={{
        width: '100px', height: '100px', borderRadius: '50%',
        background: 'rgba(255,107,107,0.2)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontSize: '50px',
        marginBottom: '20px', border: '3px solid rgba(255,107,107,0.5)'
      }}>📞</div>

      <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>112</div>
      <div style={{ fontSize: '16px', opacity: 0.8, marginBottom: '8px' }}>{status}</div>
      <div style={{ fontSize: '22px', fontWeight: '600', marginBottom: '60px', color: '#ff6b6b' }}>
        {formatTime(seconds)}
      </div>

      <div style={{ display: 'flex', gap: '30px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: '24px',
            cursor: 'pointer', marginBottom: '8px'
          }}>🔊</div>
          <div style={{ fontSize: '12px', opacity: 0.7 }}>Speaker</div>
        </div>

        <div style={{ textAlign: 'center' }} onClick={onEnd}>
          <div style={{
            width: '70px', height: '70px', borderRadius: '50%',
            background: '#ff4444', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: '28px',
            cursor: 'pointer', marginBottom: '8px',
            boxShadow: '0 8px 20px rgba(255,68,68,0.4)'
          }}>📵</div>
          <div style={{ fontSize: '12px', opacity: 0.7 }}>End Call</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: '24px',
            cursor: 'pointer', marginBottom: '8px'
          }}>🔇</div>
          <div style={{ fontSize: '12px', opacity: 0.7 }}>Mute</div>
        </div>
      </div>
    </div>
  );
}

export default CallScreen;