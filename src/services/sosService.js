export function getEmergencyContacts() {
  const user = JSON.parse(localStorage.getItem('kavach_user') || '{}');
  return [
    user.contact1,
    user.contact2,
    user.contact3,
    user.contact4,
    user.contact5
  ].filter(Boolean);
}

export function sendSOSAlert(location) {
  const contacts = getEmergencyContacts();
  console.log('SOS Alert sent to:', contacts);
  console.log('Location:', location);
  return Promise.resolve({ success: true, contacts });
}

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