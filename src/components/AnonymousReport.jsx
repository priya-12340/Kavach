import React, { useState } from 'react';

function AnonymousReport({ onClose }) {
  const [reportType, setReportType] = useState('');
  const [area, setArea] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState('');

  const reportTypes = [
    { id: 'Eve Teasing', icon: '😤' },
    { id: 'Stalking', icon: '👁️' },
    { id: 'Harassment', icon: '⚡' },
    { id: 'Assault', icon: '🚨' },
    { id: 'Domestic Violence', icon: '🏠' },
    { id: 'Cyber Crime', icon: '💻' },
    { id: 'Unsafe Area', icon: '🗺️' },
    { id: 'Other', icon: '📋' },
  ];

  function submitReport() {
    if (!reportType) { alert('Please select incident type'); return; }
    if (!area) { alert('Please select area'); return; }
    const id = 'KVC' + Date.now().toString().slice(-6);
    setReportId(id);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <>
        <div onClick={onClose} style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.3)', zIndex: 2999
        }} />
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
          background: 'white', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ textAlign: 'center', padding: '30px 20px' }}>
            <div style={{ fontSize: '60px', marginBottom: '16px' }}>✅</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#d47a7a', marginBottom: '8px' }}>Report Submitted!</div>
            <div style={{ fontSize: '13px', color: '#c28a8a', lineHeight: '1.6', marginBottom: '16px' }}>
              Your report has been submitted anonymously.<br />Your identity is completely protected.
            </div>
            <div style={{
              background: '#fff5f5', borderRadius: '20px', padding: '10px 20px',
              display: 'inline-block', fontWeight: '700', color: '#d47a7a', fontSize: '15px', marginBottom: '24px'
            }}>Report ID: {reportId}</div>
            <button onClick={onClose} style={{
              width: '100%', padding: '14px', background: 'linear-gradient(135deg, #e8a0a0, #d47a7a)',
              color: 'white', border: 'none', borderRadius: '25px', fontSize: '15px', fontWeight: '700', cursor: 'pointer'
            }}>Done</button>
          </div>
        </div>
      </>
    );
  }

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
          <h2 style={{ fontSize: '22px', marginBottom: '4px' }}>📝 Anonymous Report</h2>
          <p style={{ fontSize: '13px', opacity: 0.9 }}>Report safely and anonymously</p>
          <button onClick={onClose} style={{
            position: 'absolute', top: '20px', right: '20px',
            background: 'rgba(255,255,255,0.2)', border: 'none',
            borderRadius: '20px', padding: '8px 16px', color: 'white', cursor: 'pointer'
          }}>✕ Close</button>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#d47a7a', marginBottom: '10px' }}>
            🚨 Select Incident Type
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
            {reportTypes.map(type => (
              <div key={type.id} onClick={() => setReportType(type.id)} style={{
                padding: '12px 8px', border: `2px solid ${reportType === type.id ? '#d47a7a' : '#ffe0e0'}`,
                borderRadius: '16px', background: reportType === type.id ? '#fff0f0' : 'white',
                fontSize: '12px', fontWeight: '600', color: reportType === type.id ? '#d47a7a' : '#5a3e3e',
                cursor: 'pointer', textAlign: 'center'
              }}>
                {type.icon} {type.id}
              </div>
            ))}
          </div>

          <div style={{ fontSize: '13px', fontWeight: '700', color: '#d47a7a', marginBottom: '8px' }}>
            📍 Location of Incident
          </div>
          <select value={area} onChange={e => setArea(e.target.value)} style={{
            width: '100%', padding: '12px 16px', border: '1.5px solid #ffe0e0',
            borderRadius: '20px', fontSize: '13px', marginBottom: '16px', outline: 'none'
          }}>
            <option value="">Select area...</option>
            {['Connaught Place', 'Hauz Khas', 'Munirka', 'Sarojini Nagar', 'Lajpat Nagar',
              'Chandni Chowk', 'Karol Bagh', 'Dwarka', 'Rohini', 'Vasant Kunj', 'Other'].map(a => (
              <option key={a}>{a}</option>
            ))}
          </select>

          <div style={{ fontSize: '13px', fontWeight: '700', color: '#d47a7a', marginBottom: '8px' }}>
            🕐 When did it happen?
          </div>
          <select value={time} onChange={e => setTime(e.target.value)} style={{
            width: '100%', padding: '12px 16px', border: '1.5px solid #ffe0e0',
            borderRadius: '20px', fontSize: '13px', marginBottom: '16px', outline: 'none'
          }}>
            <option value="">Select time...</option>
            {['Just now', 'Within last hour', 'Today', 'Yesterday', 'This week', 'Earlier'].map(t => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <div style={{ fontSize: '13px', fontWeight: '700', color: '#d47a7a', marginBottom: '8px' }}>
            📝 Description (Optional)
          </div>
          <textarea value={description} onChange={e => setDescription(e.target.value)}
            placeholder="Describe what happened..."
            style={{
              width: '100%', padding: '12px 16px', border: '1.5px solid #ffe0e0',
              borderRadius: '20px', fontSize: '13px', minHeight: '100px',
              resize: 'none', outline: 'none', marginBottom: '16px', fontFamily: 'inherit'
            }}
          />

          <div style={{
            background: '#fff5f5', border: '1px solid #ffe0e0', borderRadius: '16px',
            padding: '12px', fontSize: '11px', color: '#c28a8a', textAlign: 'center', marginBottom: '16px'
          }}>
            🔒 Your identity is completely protected. This report is 100% anonymous.
          </div>

          <button onClick={submitReport} style={{
            width: '100%', padding: '14px', background: 'linear-gradient(135deg, #e8a0a0, #d47a7a)',
            color: 'white', border: 'none', borderRadius: '30px',
            fontSize: '15px', fontWeight: '700', cursor: 'pointer'
          }}>Submit Anonymous Report 🔒</button>
        </div>
      </div>
    </>
  );
}

export default AnonymousReport;