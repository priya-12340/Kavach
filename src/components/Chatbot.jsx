import React, { useState, useRef, useEffect } from 'react';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am Kavach AI. Ask me anything about safety features!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const msgsRef = useRef(null);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages]);

  function getLocalReply(text) {
    const lower = text.toLowerCase();
    if (lower.includes('sos') || lower.includes('emergency') || lower.includes('danger') || lower.includes('help'))
      return '🚨 Press the SOS button! Your emergency contacts will be alerted immediately!';
    if (lower.includes('voice'))
      return '🎤 Go to Voice Activation and say "Kavach" — SOS will start automatically!';
    if (lower.includes('contact') || lower.includes('family'))
      return '📞 You can add 5 emergency contacts in your profile!';
    if (lower.includes('safe') || lower.includes('area'))
      return '🗺️ Use Safe Journey feature to get safety score and nearby safe spots!';
    if (lower.includes('police') || lower.includes('112'))
      return '👮 Call 112 in an emergency. Kavach SOS connects to 112 automatically!';
    if (lower.includes('hi') || lower.includes('hello'))
      return 'Hello! 🌸 I am Kavach AI. How can I help you stay safe?';
    return null;
  }

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const localReply = getLocalReply(userMsg);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 200,
          system: 'You are Kavach AI Assistant for a women safety app. Answer in 2-3 lines max. Guide users on SOS, safe journey, voice activation, helplines, and anonymous reporting. If someone is in danger, tell them to press SOS immediately.',
          messages: [{ role: 'user', content: userMsg }]
        })
      });
      if (response.ok) {
        const data = await response.json();
        const reply = data.content?.[0]?.text || localReply || 'In any emergency, press SOS or call 112!';
        setMessages(prev => [...prev, { role: 'bot', text: reply }]);
        setLoading(false);
        return;
      }
    } catch (e) {}

    setMessages(prev => [...prev, { role: 'bot', text: localReply || 'In any emergency, press SOS or call 112!' }]);
    setLoading(false);
  }

  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)} style={{
        position: 'fixed', bottom: '80px', right: '16px',
        width: '52px', height: '52px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #e8a0a0, #d47a7a)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '24px', cursor: 'pointer', zIndex: 999,
        boxShadow: '0 4px 15px rgba(212,122,122,0.4)'
      }}>🤖</div>

      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '145px', right: '16px',
          width: '300px', height: '380px', background: 'white',
          borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          display: 'flex', flexDirection: 'column', zIndex: 999,
          border: '1px solid #ffe0e0'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #e8a0a0, #d47a7a)',
            padding: '12px 16px', borderRadius: '20px 20px 0 0',
            color: 'white', fontWeight: '600', fontSize: '14px'
          }}>🤖 Kavach AI Assistant</div>

          <div ref={msgsRef} style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background: msg.role === 'user' ? 'linear-gradient(135deg, #e8a0a0, #d47a7a)' : '#fff5f5',
                color: msg.role === 'user' ? 'white' : '#5a3e3e',
                padding: '8px 12px', borderRadius: '14px',
                maxWidth: '85%', fontSize: '13px', lineHeight: '1.4'
              }}>{msg.text}</div>
            ))}
            {loading && (
              <div style={{ alignSelf: 'flex-start', background: '#fff5f5', padding: '8px 12px', borderRadius: '14px', fontSize: '13px', color: '#c28a8a' }}>
                typing...
              </div>
            )}
          </div>

          <div style={{ display: 'flex', padding: '10px', gap: '8px', borderTop: '1px solid #ffe0e0' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask anything..."
              style={{ flex: 1, padding: '8px 12px', borderRadius: '20px', border: '1.5px solid #ffe0e0', fontSize: '13px', outline: 'none' }}
            />
            <button onClick={sendMessage} style={{
              background: 'linear-gradient(135deg, #e8a0a0, #d47a7a)',
              border: 'none', borderRadius: '50%', width: '34px', height: '34px',
              color: 'white', cursor: 'pointer', fontSize: '16px'
            }}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;