import React, { useState } from 'react';

function Notifications({ onClose }) {
  const [notifications, setNotifications] = useState([
    { id: 1, icon: '🚨', title: 'SOS Alert', message: 'Your SOS was sent successfully', time: '2 min ago', unread: true },
    { id: 2, icon: '📍', title: 'Location Update', message: 'Location sharing is active', time: '10 min ago', unread: true },
    { id: 3, icon: '🛡️', title: 'Safety Tip', message: 'Stay aware of your surroundings', time: '1 hr ago', unread: false },
  ]);

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  }

  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, width: '300px', height: '100vh',
      background: 'white', zIndex: 3000, boxShadow: '-5px 0 20px rgba(0,0,0,0.1)',
      display: 'flex', flexDirection: 'column'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #e8a0a0, #d47a7a)',
        padding: '20px 16px', color: 'white',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ fontWeight: '700', fontSize: '18px' }}>🔔 Notifications</div>
        <button onClick={onClose} style={{
          background: 'rgba(255,255,255,0.2)', border: 'none',
          borderRadius: '20px', padding: '6px 12px', color: 'white', cursor: 'pointer'
        }}>✕ Close</button>
      </div>

      <div style={{ padding: '12px 16px', borderBottom: '1px solid #ffe0e0', display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={markAllRead} style={{
          background: 'none', border: '1px solid #d47a7a', borderRadius: '20px',
          padding: '6px 14px', color: '#d47a7a', fontSize: '12px', cursor: 'pointer'
        }}>Mark all read</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {notifications.map(n => (
          <div key={n.id} style={{
            padding: '14px 16px', borderBottom: '1px solid #fff0f0',
            background: n.unread ? '#fff5f5' : 'white',
            display: 'flex', gap: '12px', alignItems: 'flex-start'
          }}>
            <div style={{ fontSize: '24px' }}>{n.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', fontSize: '14px', color: '#5a3e3e' }}>{n.title}</div>
              <div style={{ fontSize: '12px', color: '#c28a8a', margin: '3px 0' }}>{n.message}</div>
              <div style={{ fontSize: '11px', color: '#d4a0a0' }}>{n.time}</div>
            </div>
            {n.unread && (
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff6b6b', marginTop: '4px' }}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;