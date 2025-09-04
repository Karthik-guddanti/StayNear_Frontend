// client/src/services/api.ts

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

// Add an interceptor to include the auth token in requests if it exists
api.interceptors.request.use((config) => {
  try {
    const userInfo = localStorage.getItem('staynear_userInfo');
    if (userInfo) {
      const token = JSON.parse(userInfo).token;
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Could not parse user info from localStorage", error);
  }
  return config;
});

// --- API Functions ---

/**
 * Searches for a location's coordinates using the backend.
 * @param query The location search term (e.g., "Hyderabad").
 */
export const searchLocation = (query: string) => {
  return api.get(`/locations/search?query=${encodeURIComponent(query)}`);
};

/**
 * Searches for hostels based on location and filter parameters.
 * @param params URLSearchParams object with lat, lng, and filters.
 */
export const searchHostels = (params: URLSearchParams) => {
  return api.get(`/hostels/search?${params.toString()}`);
};

/**
 * Fetches the details for a single hostel by its ID.
 * @param id The MongoDB _id of the hostel.
 */
export const getHostelById = (id: string) => {
  return api.get(`/hostels/${id}`);
};

/**
 * Logs a user in.
 * @param data User login credentials ({ email, password }).
 */
export const loginUser = (data: any) => {
  return api.post('/users/login', data);
};

/**
 * Registers a new user.
 * @param data User registration details ({ name, email, password }).
 */
export const registerUser = (data: any) => {
  return api.post('/users/register', data);
};