import React from 'react';

function BottomNav({ active, onChange }) {
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'journey', icon: '🛡️', label: 'Journey' },
    { id: 'report', icon: '📝', label: 'Report' },
    { id: 'helplines', icon: '📞', label: 'Helplines' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: '450px', background: 'white',
      borderTop: '1px solid #ffe0e0', display: 'flex',
      justifyContent: 'space-around', padding: '8px 0', zIndex: 900,
      boxShadow: '0 -4px 15px rgba(0,0,0,0.05)'
    }}>
      {tabs.map(tab => (
        <div key={tab.id} onClick={() => onChange(tab.id)} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          cursor: 'pointer', padding: '4px 12px',
          color: active === tab.id ? '#d47a7a' : '#c28a8a',
        }}>
          <span style={{ fontSize: '22px' }}>{tab.icon}</span>
          <span style={{
            fontSize: '10px', fontWeight: active === tab.id ? '700' : '500',
            marginTop: '2px'
          }}>{tab.label}</span>
          {active === tab.id && (
            <div style={{ width: '20px', height: '3px', background: '#d47a7a', borderRadius: '2px', marginTop: '2px' }} />
          )}
        </div>
      ))}
    </div>
  );
}

export default BottomNav;