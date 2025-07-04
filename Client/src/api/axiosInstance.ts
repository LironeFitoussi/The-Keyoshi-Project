// src/utils/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/v1', // Since frontend and API are now served from same domain
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Interceptors
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token'); // or get from context
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle global errors (e.g., redirect on 401)
//     if (error.response?.status === 401) {
//       console.warn('Unauthorized. Redirecting to login...');
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
