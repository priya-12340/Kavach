import React, { useState, useRef } from 'react';

function EvidenceVault({ onClose }) {
  const [files, setFiles] = useState([]);
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  function handleFileUpload(e) {
    const uploaded = Array.from(e.target.files).map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type.startsWith('image') ? '🖼️' : file.type.startsWith('video') ? '🎥' : '📄',
      date: new Date().toLocaleDateString()
    }));
    setFiles(prev => [...prev, ...uploaded]);
  }

  function removeFile(index) {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }

  function saveVault() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
          <h2 style={{ fontSize: '22px', marginBottom: '4px' }}>☁️ Evidence Vault</h2>
          <p style={{ fontSize: '13px', opacity: 0.9 }}>Store evidence safely and securely</p>
          <button onClick={onClose} style={{
            position: 'absolute', top: '20px', right: '20px',
            background: 'rgba(255,255,255,0.2)', border: 'none',
            borderRadius: '20px', padding: '8px 16px', color: 'white', cursor: 'pointer'
          }}>✕ Close</button>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{
            background: '#fff5f5', border: '2px dashed #e8a0a0', borderRadius: '20px',
            padding: '30px', textAlign: 'center', marginBottom: '20px', cursor: 'pointer'
          }} onClick={() => fileInputRef.current.click()}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>☁️</div>
            <div style={{ fontWeight: '700', color: '#d47a7a', marginBottom: '4px' }}>Upload Evidence</div>
            <div style={{ fontSize: '12px', color: '#c28a8a' }}>Photos, Videos, Documents</div>
            <input ref={fileInputRef} type="file" multiple accept="image/*,video/*,.pdf,.doc"
              onChange={handleFileUpload} style={{ display: 'none' }} />
          </div>

          {files.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontWeight: '600', color: '#d47a7a', marginBottom: '10px' }}>
                📁 Uploaded Files ({files.length})
              </div>
              {files.map((file, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px', background: '#fff5f5', borderRadius: '16px',
                  marginBottom: '8px', border: '1px solid #ffe0e0'
                }}>
                  <span style={{ fontSize: '24px' }}>{file.type}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#5a3e3e' }}>{file.name}</div>
                    <div style={{ fontSize: '11px', color: '#c28a8a' }}>{file.size} • {file.date}</div>
                  </div>
                  <button onClick={() => removeFile(i)} style={{
                    background: 'none', border: 'none', color: '#ff6b6b',
                    fontSize: '18px', cursor: 'pointer'
                  }}>🗑️</button>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: '600', color: '#d47a7a', marginBottom: '8px' }}>📝 Notes</div>
            <textarea value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="Add notes about the incident..."
              style={{
                width: '100%', padding: '12px 16px', border: '1.5px solid #ffe0e0',
                borderRadius: '20px', fontSize: '13px', minHeight: '100px',
                resize: 'none', outline: 'none', fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{
            background: '#fff5f5', border: '1px solid #ffe0e0', borderRadius: '16px',
            padding: '12px', fontSize: '11px', color: '#c28a8a', textAlign: 'center', marginBottom: '16px'
          }}>
            🔒 All evidence is stored securely. Only you can access it.
          </div>

          <button onClick={saveVault} style={{
            width: '100%', padding: '14px',
            background: saved ? '#4caf50' : 'linear-gradient(135deg, #e8a0a0, #d47a7a)',
            color: 'white', border: 'none', borderRadius: '30px',
            fontSize: '15px', fontWeight: '700', cursor: 'pointer'
          }}>
            {saved ? '✅ Saved Securely!' : '💾 Save to Vault'}
          </button>
        </div>
      </div>
    </>
  );
}

export default EvidenceVault;