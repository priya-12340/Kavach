const BASE_URL = 'http://localhost:8080/api';

export function sendOTP(mobile) {
  return new Promise((resolve, reject) => {
    if (mobile.length !== 10) {
      reject('Please enter a valid 10-digit number');
      return;
    }
    setTimeout(() => resolve(true), 1000);
  });
}

export function verifyOTP(otp) {
  return new Promise((resolve, reject) => {
    if (otp.length < 4) {
      reject('Please enter a valid OTP');
      return;
    }
    setTimeout(() => resolve(true), 1000);
  });
}

export async function saveUserToBackend(userData) {
  const response = await fetch(`${BASE_URL}/users/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return await response.json();
}

export async function getUserByPhone(phone) {
  const response = await fetch(`${BASE_URL}/users/${phone}`);
  return await response.json();
}

export function saveUser(userData) {
  localStorage.setItem('kavach_user', JSON.stringify(userData));
}

export function getUser() {
  return JSON.parse(localStorage.getItem('kavach_user') || '{}');
}

export function clearUser() {
  localStorage.removeItem('kavach_user');
}