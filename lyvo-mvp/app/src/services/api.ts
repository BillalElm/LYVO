import axios from 'axios';

/**
 * Axios instance configured to talk to your back‑end API.
 * The base URL comes from the Expo environment variable EXPO_PUBLIC_API_URL.
 */
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000',
});

export default api;
