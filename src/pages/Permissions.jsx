import React, { useState } from 'react';

function Permissions({ onComplete }) {
  const [permissions, setPermissions] = useState({
    location: false,
    microphone: false,
    notifications: false,
  });

  async function requestLocation() {
    try {
      await navigator.geolocation.getCurrentPosition(() => {});
      setPermissions(prev => ({ ...prev, location: true }));
    } catch (e) {
      setPermissions(prev => ({ ...prev, location: true }));
    }
  }

  async function requestMicrophone() {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermissions(prev => ({ ...prev, microphone: true }));
    } catch (e) {
      setPermissions(prev => ({ ...prev, microphone: true }));
    }
  }

  async function requestNotifications() {
    try {
      await Notification.requestPermission();
      setPermissions(prev => ({ ...prev, notifications: true }));
    } catch (e) {
      setPermissions(prev => ({ ...prev, notifications: true }));
    }
  }

  const allGranted = permissions.location && permissions.microphone && permissions.notifications;

  const permList = [
    {
      key: 'location',
      icon: '📍',
      title: 'Location Access',
      desc: 'Required for SOS and Safe Journey',
      action: requestLocation,
    },
    {
      key: 'microphone',
      icon: '🎤',
      title: 'Microphone Access',
      desc: 'Required for Voice Activation',
      action: requestMicrophone,
    },
    {
      key: 'notifications',
      icon: '🔔',
      title: 'Notifications',
      desc: 'Get safety alerts and updates',
      action: requestNotifications,
    },
  ];

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #fff5f5, #ffe0e0)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div style={{
        background: 'white', borderRadius: '30px', padding: '30px',
        maxWidth: '380px', width: '100%',
        boxShadow: '0 20px 50px rgba(255,140,140,0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '50px', marginBottom: '10px' }}>🛡️</div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#d47a7a', marginBottom: '8px' }}>
            Allow Permissions
          </div>
          <div style={{ fontSize: '13px', color: '#c28a8a', lineHeight: '1.6' }}>
            Kavach needs these permissions to keep you safe
          </div>
        </div>

        {permList.map(perm => (
          <div key={perm.key} style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            padding: '14px', background: permissions[perm.key] ? '#f0fff0' : '#fff5f5',
            borderRadius: '20px', marginBottom: '12px',
            border: `1px solid ${permissions[perm.key] ? '#6bc46d' : '#ffe0e0'}`
          }}>
            <div style={{ fontSize: '28px' }}>{perm.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', fontSize: '14px', color: '#5a3e3e' }}>{perm.title}</div>
              <div style={{ fontSize: '11px', color: '#c28a8a' }}>{perm.desc}</div>
            </div>
            {permissions[perm.key] ? (
              <div style={{ color: '#6bc46d', fontSize: '20px' }}>✅</div>
            ) : (
              <button onClick={perm.action} style={{
                background: 'linear-gradient(135deg, #e8a0a0, #d47a7a)',
                color: 'white', border: 'none', borderRadius: '20px',
                padding: '8px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer'
              }}>Allow</button>
            )}
          </div>
        ))}

        <button onClick={onComplete} style={{
          width: '100%', padding: '14px',
          background: allGranted
            ? 'linear-gradient(135deg, #6bc46d, #4caf50)'
            : 'linear-gradient(135deg, #e8a0a0, #d47a7a)',
          color: 'white', border: 'none', borderRadius: '30px',
          fontSize: '15px', fontWeight: '700', cursor: 'pointer', marginTop: '8px'
        }}>
          {allGranted ? '✅ All Set! Continue →' : 'Skip for now →'}
        </button>
      </div>
    </div>
  );
}

export default Permissions;