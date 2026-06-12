import React, { useState, useEffect } from 'react';

function ProfileDrawer({ onClose }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', location: '', blood: ''
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('kavach_user') || '{}');
    setForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
      blood: user.blood || ''
    });
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function saveProfile() {
    const user = JSON.parse(localStorage.getItem('kavach_user') || '{}');
    const updated = { ...user, ...form };
    localStorage.setItem('kavach_user', JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 1200);
  }

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        background: 'rgba(0,0,0,0.3)', zIndex: 2999
      }} />

      <div style={{
        position: 'fixed', top: 0, left: 0, width: '280px', height: '100vh',
        background: 'white', zIndex: 3000, overflowY: 'auto',
        boxShadow: '5px 0 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #e8a0a0, #d47a7a)',
          padding: '30px 20px', color: 'white', textAlign: 'center'
        }}>
          <div style={{ fontSize: '50px', marginBottom: '8px' }}>👤</div>
          <div style={{ fontWeight: '700', fontSize: '18px' }}>{form.name || 'Your Name'}</div>
          <div style={{ fontSize: '13px', opacity: 0.9 }}>{form.email || 'your@email.com'}</div>
        </div>

        <div style={{ padding: '20px' }}>
          {[
            { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Enter your name' },
            { label: 'Email', name: 'email', type: 'email', placeholder: 'your@email.com' },
            { label: 'Phone', name: 'phone', type: 'tel', placeholder: 'Phone number' },
            { label: 'City', name: 'location', type: 'text', placeholder: 'Your city' },
          ].map(field => (
            <div key={field.name} style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#d47a7a', display: 'block', marginBottom: '6px' }}>
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                style={{
                  width: '100%', padding: '10px 14px', border: '1.5px solid #ffe0e0',
                  borderRadius: '20px', fontSize: '13px', outline: 'none'
                }}
              />
            </div>
          ))}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#d47a7a', display: 'block', marginBottom: '6px' }}>
              Blood Group
            </label>
            <select name="blood" value={form.blood} onChange={handleChange} style={{
              width: '100%', padding: '10px 14px', border: '1.5px solid #ffe0e0',
              borderRadius: '20px', fontSize: '13px', outline: 'none'
            }}>
              <option value="">Select</option>
              <option>A+</option><option>A-</option>
              <option>B+</option><option>B-</option>
              <option>O+</option><option>O-</option>
              <option>AB+</option><option>AB-</option>
            </select>
          </div>

          <button onClick={saveProfile} style={{
            width: '100%', padding: '12px',
            background: saved ? '#4caf50' : 'linear-gradient(135deg, #e8a0a0, #d47a7a)',
            color: 'white', border: 'none', borderRadius: '25px',
            fontSize: '15px', fontWeight: '700', cursor: 'pointer'
          }}>
            {saved ? '✅ Saved!' : '💾 Save Profile'}
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileDrawer;