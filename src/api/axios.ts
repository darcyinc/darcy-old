import Axios from 'axios';

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: '',
  },
  // disable throw error on 4xx and 5xx
  validateStatus: () => true,
});

function updateToken() {
  const token = localStorage.getItem('token');
  if (token) axios.defaults.headers.Authorization = `Bearer ${token}`;
  else delete axios.defaults.headers.Authorization;
}

if (typeof window !== 'undefined') {
  updateToken();

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', () => updateToken());
  }
}
