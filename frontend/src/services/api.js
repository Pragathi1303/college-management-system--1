import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "");

const API_URL = `${BASE_URL}/api`;

const api = axios.create({
  baseURL: API_URL,
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
