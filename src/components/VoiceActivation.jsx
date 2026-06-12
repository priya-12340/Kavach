import React, { useState, useRef } from 'react';

function VoiceActivation({ onClose, onSOSTrigger }) {
  const [isListening, setIsListening] = useState(false);
  const [heardText, setHeardText] = useState('');
  const [status, setStatus] = useState('Voice Detection: OFF');
  const [subStatus, setSubStatus] = useState('Press button and say "Kavach"');
  const recognitionRef = useRef(null);

  function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser. Use Chrome.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setStatus('Listening...');
      setSubStatus('Say "Kavach" to trigger SOS');
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('').toLowerCase();
      setHeardText(transcript);
      if (transcript.includes('kavach')) {
        recognition.stop();
        setStatus('🚨 "Kavach" Detected!');
        setSubStatus('Triggering SOS...');
        setTimeout(() => {
          onSOSTrigger();
          onClose();
        }, 1000);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      setStatus('Voice Detection: OFF');
      setSubStatus('Press button and say "Kavach"');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }

  function stopListening() {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsListening(false);
    setStatus('Voice Detection: OFF');
    setSubStatus('Press button and say "Kavach"');
    setHeardText('');
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
          <h2 style={{ fontSize: '22px', marginBottom: '4px' }}>🎤 Voice Activation</h2>
          <p style={{ fontSize: '13px', opacity: 0.9 }}>Say "Kavach" to trigger SOS</p>
          <button onClick={onClose} style={{
            position: 'absolute', top: '20px', right: '20px',
            background: 'rgba(255,255,255,0.2)', border: 'none',
            borderRadius: '20px', padding: '8px 16px', color: 'white', cursor: 'pointer'
          }}>✕ Close</button>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #fff5f5, #ffe0e0)',
            border: '2px solid #ffe0e0', borderRadius: '24px',
            padding: '24px', textAlign: 'center', marginBottom: '16px'
          }}>
            <div style={{ fontSize: '60px', marginBottom: '10px' }}>
              {isListening ? '🔴' : '🎤'}
            </div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#d47a7a', marginBottom: '4px' }}>
              {status}
            </div>
            <div style={{ fontSize: '12px', color: '#c28a8a' }}>{subStatus}</div>
            {heardText && (
              <div style={{
                fontSize: '13px', color: '#5a3e3e', background: 'white',
                borderRadius: '16px', padding: '8px 14px', marginTop: '12px',
                border: '1.5px solid #ffe0e0'
              }}>
                🎙️ Heard: {heardText}
              </div>
            )}
          </div>

          {!isListening ? (
            <button onClick={startListening} style={{
              width: '100%', padding: '16px', border: 'none', borderRadius: '30px',
              background: 'linear-gradient(135deg, #e8a0a0, #d47a7a)',
              color: 'white', fontSize: '15px', fontWeight: '700', cursor: 'pointer', marginBottom: '10px'
            }}>🎤 Start Voice Activation</button>
          ) : (
            <button onClick={stopListening} style={{
              width: '100%', padding: '16px', border: 'none', borderRadius: '30px',
              background: '#ffe0e0', color: '#d47a7a',
              fontSize: '15px', fontWeight: '700', cursor: 'pointer', marginBottom: '10px'
            }}>⏹️ Stop Listening</button>
          )}

          <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #ffe0e0', padding: '16px' }}>
            <div style={{ fontWeight: '600', color: '#d47a7a', marginBottom: '10px' }}>ℹ️ How does it work?</div>
            {[
              { icon: '🎤', text: 'Press "Start Voice Activation"' },
              { icon: '🗣️', text: 'Clearly say: "Kavach"' },
              { icon: '🚨', text: 'SOS timer will start automatically' },
              { icon: '📞', text: 'Emergency call after 5 seconds' },
              { icon: '🔇', text: 'Works even with background noise' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', gap: '8px', padding: '8px 0',
                borderBottom: '1px solid #ffe0e0', fontSize: '13px', alignItems: 'center'
              }}>
                <span>{item.icon}</span><span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default VoiceActivation;