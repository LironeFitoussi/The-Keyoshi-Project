// src/utils/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1', // Since frontend and API are now served from same domain
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth0 token getter - this will be set by the app
let getAccessToken: (() => Promise<string>) | null = null;

export const setTokenGetter = (tokenGetter: () => Promise<string>) => {
  getAccessToken = tokenGetter;
};

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  async (config) => {
    if (getAccessToken) {
      try {
        const token = await getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error getting access token:', error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors (e.g., redirect on 401)
    if (error.response?.status === 401) {
      console.warn('Unauthorized. Redirecting to login...');
      // You can add logout logic here if needed
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
