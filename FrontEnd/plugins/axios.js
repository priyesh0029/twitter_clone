// plugins/axios.js
import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: 'http://localhost:3001/api', // Replace with your actual base URL
  });

  // Request interceptor to add the Authorization header if the token is present
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor for error handling
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        // Display toast notification for errors
        // const toast = nuxtApp.$toast;
        // toast.error(error.response.data.message || 'An error occurred');
        alert(error.response.data.message || 'An error occurred');

      }
      return Promise.reject(error);
    }
  );

  // Inject the axios instance into the Nuxt context
  nuxtApp.provide('api', api);
});
