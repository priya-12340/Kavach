export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      err => reject(err.message)
    );
  });
}

export function calculateSafetyScore(start, destination) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const score = Math.floor(Math.random() * 40) + 60;
      resolve({
        score,
        status: score >= 80 ? 'Safe Route' : score >= 60 ? 'Moderate Risk' : 'High Risk',
        color: score >= 80 ? '#6bc46d' : score >= 60 ? '#ffb347' : '#ff6b6b'
      });
    }, 1000);
  });
}

export function findNearbyPlaces(lat, lng, type) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'Police Station', type: 'police', distance: '0.5 km', icon: '🚔' },
        { name: 'City Hospital', type: 'hospital', distance: '1.2 km', icon: '🏥' },
        { name: 'Metro Station', type: 'metro', distance: '0.8 km', icon: '🚇' },
        { name: 'Safe Zone', type: 'safe', distance: '0.3 km', icon: '🟢' },
      ]);
    }, 800);
  });
}