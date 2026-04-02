import axios from 'axios';

// Production backend
const BASE_URL = 'https://heavenly-backend-p7sp.onrender.com';

// For local development, swap to one of:
// Android emulator:  http://10.0.2.2:5000
// iOS simulator:     http://localhost:5000
// Physical device:   http://<your-local-ip>:5000

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchComfort(message) {
  const response = await api.post('/api/comfort', { message });
  return response.data;
}

export async function checkHealth() {
  const response = await api.get('/api/health');
  return response.data;
}
