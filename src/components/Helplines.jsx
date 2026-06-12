import React from 'react';

function Helplines({ onClose }) {
  const helplines = [
    { name: 'Police', number: '100', icon: '👮', color: '#4a90d9', desc: '24/7 Emergency' },
    { name: 'Women Helpline', number: '1091', icon: '👩', color: '#d47a7a', desc: 'Women in distress' },
    { name: 'Emergency', number: '112', icon: '🚨', color: '#ff6b6b', desc: 'All emergencies' },
    { name: 'Ambulance', number: '108', icon: '🚑', color: '#e8a0a0', desc: 'Medical emergency' },
    { name: 'Fire Brigade', number: '101', icon: '🚒', color: '#ff9966', desc: 'Fire emergency' },
    { name: 'Domestic Violence', number: '181', icon: '🏠', color: '#9b59b6', desc: 'Domestic abuse help' },
    { name: 'Childline', number: '1098', icon: '👶', color: '#27ae60', desc: 'Child in danger' },
    { name: 'Cyber Crime', number: '1930', icon: '💻', color: '#2c3e50', desc: 'Online crime' },
    { name: 'Railway Police', number: '182', icon: '🚆', color: '#8e44ad', desc: 'Railway emergency' },
    { name: 'Road Accident', number: '1073', icon: '🚗', color: '#e67e22', desc: 'Road accident help' },
  ];

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        background: 'rgba(0,0,0,0.3)', zIndex: 2999
      }} />
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
        background: 'white', zIndex: 3000, overflowY: 'auto'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #e8a0a0, #d47a7a)',
          padding: '25px 20px', color: 'white', textAlign: 'center', position: 'relative'
        }}>
          <h2 style={{ fontSize: '22px', marginBottom: '4px' }}>📞 Emergency Helplines</h2>
          <p style={{ fontSize: '13px', opacity: 0.9 }}>Tap to call instantly</p>
          <button onClick={onClose} style={{
            position: 'absolute', top: '20px', right: '20px',
            background: 'rgba(255,255,255,0.2)', border: 'none',
            borderRadius: '20px', padding: '8px 16px', color: 'white', cursor: 'pointer'
          }}>✕ Close</button>
        </div>

        <div style={{ padding: '16px' }}>
          {helplines.map((h, i) => (
            <a key={i} href={`tel:${h.number}`} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '14px 16px', background: 'white', borderRadius: '20px',
                marginBottom: '10px', border: '1px solid #ffe0e0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: h.color + '20', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: '22px'
                }}>{h.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '15px', color: '#5a3e3e' }}>{h.name}</div>
                  <div style={{ fontSize: '12px', color: '#c28a8a' }}>{h.desc}</div>
                </div>
                <div style={{
                  background: h.color, color: 'white', borderRadius: '20px',
                  padding: '8px 16px', fontWeight: '700', fontSize: '16px'
                }}>{h.number}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default Helplines;