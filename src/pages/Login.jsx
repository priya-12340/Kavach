import React, { useState } from 'react';
import { sendOTP, verifyOTP } from '../services/authService';

function Login({onLogin}) {
  const [showOTP, setShowOTP] = useState(false);

 async function handleSendOTP() {
  try {
    await sendOTP(document.getElementById('mobile').value);
    setShowOTP(true);
  } catch (err) {
    alert(err);
  }
}

async function handleVerifyOTP() {
  try {
    await verifyOTP(document.getElementById('otp').value);
    onLogin();
  } catch (err) {
    alert(err);
  }
}

  return (
    <div className="login-container">
      <div className="logo">
        <img src="/Images/kavachLogo.png" alt="logo"/>
      </div>
      <div className="logo-text">Kavach</div>
      <div className="tagline">Your Safety, Our Priority</div>

      <div className="input-group">
        <input type="tel" id="mobile" placeholder="Phone Number" maxLength="10" />
      </div>

      <button className="btn" onClick={handleSendOTP}>Send OTP</button>

      {showOTP && (
        <div style={{ marginTop: '15px' }}>
          <div className="input-group">
            <input type="text" id="otp" placeholder="Enter OTP" />
          </div>
          <button className="btn" onClick={handleVerifyOTP}>Verify & Continue</button>
        </div>
      )}

      <div className="info-note" style={{ marginTop: '25px' }}>
        🔐 24/7 emergency protection
      </div>
    </div>
  );
}

export default Login;