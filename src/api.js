import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + '/api', // e.g., https://qroll-backend.up.railway.app/api
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // match key from login.jsx
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
