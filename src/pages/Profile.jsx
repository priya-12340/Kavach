import React, { useState } from 'react';
import { saveUserToBackend, saveUser } from '../services/authService';

function Profile({ onComplete }) {
  const [form, setForm] = useState({
    name: '', age: '', gender: '', email: '',
    location: '', bloodGroup: '',
    contact1: '', contact2: '', contact3: '', contact4: '', contact5: ''
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function saveProfile() {
  if (!form.name) { alert('Please enter your name'); return; }
  saveUser(form);
  try {
    await saveUserToBackend(form);
    console.log('User saved to backend!');
  } catch (err) {
    console.log('Backend not available, saved locally');
  }
  onComplete();
}

  return (
    <div className="modal-overlay" style={{ display: 'flex' }}>
      <div className="form-container">
        <div className="form-header">
          <div className="form-icon">👤</div>
          <h2>Complete Your Profile</h2>
          <p>This information helps us protect you better</p>
        </div>

        <div className="form-body">
          <div className="form-group">
            <label> Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>📅 Age</label>
              <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" />
            </div>
            <div className="form-group">
              <label>⚥ Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>📧 Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
          </div>

          <div className="form-group">
            <label>📍 Address</label>
            <input name="location" value={form.location} onChange={handleChange} placeholder="Your home address" />
          </div>

          <div className="form-group">
            <label>🩸 Blood Group</label>
            <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange}>
              <option value="">Select</option>
              <option>A+</option><option>A-</option>
              <option>B+</option><option>B-</option>
              <option>O+</option><option>O-</option>
              <option>AB+</option><option>AB-</option>
            </select>
          </div>

          <div className="form-group">
            <label>👨‍👩 Contact 1 (Primary)</label>
            <input type="tel" name="contact1" value={form.contact1} onChange={handleChange} placeholder="Name - Phone" />
          </div>

          <div className="form-group">
            <label>👫 Contact 2</label>
            <input type="tel" name="contact2" value={form.contact2} onChange={handleChange} placeholder="Name - Phone" />
          </div>

          <div className="form-group">
            <label>👥 Contact 3</label>
            <input type="tel" name="contact3" value={form.contact3} onChange={handleChange} placeholder="Name - Phone" />
          </div>

          <button className="btn" onClick={saveProfile}>
            Save & Continue 🛡️
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;