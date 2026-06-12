import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { calculateSafetyScore } from '../services/locationService';

const libraries = ['places'];
const mapContainerStyle = { width: '100%', height: '350px', borderRadius: '16px' };
const defaultCenter = { lat: 28.6139, lng: 77.2090 };

function SafeJourney({ onClose }) {
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [score, setScore] = useState(null);
  const [status, setStatus] = useState('');
  const [directions, setDirections] = useState(null);
  const [loading, setLoading] = useState(false);

  async function calculateRoute() {
    if (!start || !destination) {
      alert('Please enter both start and destination');
      return;
    }
    setLoading(true);
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route({
      origin: start,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    }, async (result, status) => {
      if (status === 'OK') setDirections(result);
      const result2 = await calculateSafetyScore(start, destination);
      setScore(result2.score);
      setStatus(result2.status);
      setLoading(false);
    });
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
          <h2 style={{ fontSize: '22px', marginBottom: '4px' }}>🛡️ Safe Journey</h2>
          <p style={{ fontSize: '13px', opacity: 0.9 }}>Plan your route with safety score</p>
          <button onClick={onClose} style={{
            position: 'absolute', top: '20px', right: '20px',
            background: 'rgba(255,255,255,0.2)', border: 'none',
            borderRadius: '20px', padding: '8px 16px', color: 'white', cursor: 'pointer'
          }}>✕ Close</button>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#d47a7a', display: 'block', marginBottom: '8px' }}>
              📍 Start Location
            </label>
            <input value={start} onChange={e => setStart(e.target.value)}
              placeholder="Enter start location..."
              style={{ width: '100%', padding: '14px 18px', border: '2px solid #ffe0e0', borderRadius: '30px', fontSize: '14px', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#d47a7a', display: 'block', marginBottom: '8px' }}>
              🏁 Destination
            </label>
            <input value={destination} onChange={e => setDestination(e.target.value)}
              placeholder="Enter destination..."
              style={{ width: '100%', padding: '14px 18px', border: '2px solid #ffe0e0', borderRadius: '30px', fontSize: '14px', outline: 'none' }}
            />
          </div>

          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY} libraries={libraries}>
            <GoogleMap mapContainerStyle={mapContainerStyle} center={defaultCenter} zoom={12}>
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </LoadScript>

          {score && (
            <div style={{
              background: score >= 80 ? '#f0fff0' : score >= 60 ? '#fffdf0' : '#fff0f0',
              border: `2px solid ${score >= 80 ? '#6bc46d' : score >= 60 ? '#ffb347' : '#ff6b6b'}`,
              borderRadius: '20px', padding: '20px', textAlign: 'center', margin: '16px 0'
            }}>
              <div style={{ fontSize: '48px', fontWeight: '700', color: score >= 80 ? '#6bc46d' : score >= 60 ? '#ffb347' : '#ff6b6b' }}>
                {score}
              </div>
              <div style={{ fontSize: '14px', color: '#5a3e3e', fontWeight: '600' }}>Safety Score</div>
              <div style={{ fontSize: '16px', marginTop: '8px', fontWeight: '700' }}>{status}</div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button onClick={onClose} style={{
              flex: 1, padding: '14px', background: '#ffe0e0', color: '#d47a7a',
              border: 'none', borderRadius: '25px', fontSize: '14px', fontWeight: '600', cursor: 'pointer'
            }}>Close</button>
            <button onClick={calculateRoute} disabled={loading} style={{
              flex: 2, padding: '14px', background: 'linear-gradient(135deg, #e8a0a0, #d47a7a)',
              color: 'white', border: 'none', borderRadius: '25px', fontSize: '14px', fontWeight: '600', cursor: 'pointer'
            }}>{loading ? 'Calculating...' : 'Calculate Route →'}</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SafeJourney;