// src/utils/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1', // Since frontend and API are now served from same domain
  timeout: 30000, // Increased timeout for slower connections
  headers: {
    'Content-Type': 'application/json',
  },
  // Add retry configuration
  validateStatus: (status) => status >= 200 && status < 500, // Don't reject if status is less than 500
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
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      // Network or timeout error
      if (!error.response) {
        console.error('Network Error:', error.message);
        return Promise.reject(new Error('A network error occurred. Please check your connection and try again.'));
      }
      
      // Server error
      if (error.response.status >= 500) {
        console.error('Server Error:', error.response.status);
        return Promise.reject(new Error('A server error occurred. Please try again later.'));
      }

      // Auth error
      if (error.response.status === 401) {
        console.warn('Unauthorized. Redirecting to login...');
        // You can add logout logic here if needed
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
