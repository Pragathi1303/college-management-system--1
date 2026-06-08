import axios from "axios";

// Determine the base URL from environment or default to local backend
const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Make sure this port matches your backend server!
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    try {
      const raw = localStorage.getItem("authSession");
      if (raw) {
        const session = JSON.parse(raw);
        if (session && session.token) {
          config.headers.Authorization = `Bearer ${session.token}`;
        }
      }
    } catch (e) {
      // Ignore parse error
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle global errors (like 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Dispatch event to context for forced logout
      window.dispatchEvent(new Event("auth:logout"));
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
