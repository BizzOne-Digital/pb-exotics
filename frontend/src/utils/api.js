import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' }
});

// Re-attach token on every request in case it was set after instance creation
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pb_token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('pb_token');
      localStorage.removeItem('pb_user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);

export default api;
