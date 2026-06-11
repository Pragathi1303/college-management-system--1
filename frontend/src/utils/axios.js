import axios from "axios";

const API_BASE =
  process.env.REACT_APP_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5001"
    : "");

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// -------------------------------------------------------------------
// Request Interceptor: Attach JWT token to every request
// -------------------------------------------------------------------
api.interceptors.request.use(
  (config) => {
    const session = localStorage.getItem("authSession");
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed.token) {
          config.headers.Authorization = `Bearer ${parsed.token}`;
        }
      } catch {
        // ignore parse errors
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// -------------------------------------------------------------------
// Response Interceptor: Global error handling
// -------------------------------------------------------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Auto-logout on 401 / 403 (invalid/expired token)
      if (status === 401 || status === 403) {
        localStorage.removeItem("authSession");
        // Let the app know by dispatching a custom event
        window.dispatchEvent(new CustomEvent("auth:logout"));
      }

      // Standardize error message
      const message = data?.message || "An unexpected error occurred.";
      return Promise.reject(new Error(message));
    }

    if (error.code === "ECONNABORTED") {
      return Promise.reject(new Error("Request timed out. Please try again."));
    }

    if (!error.response) {
      return Promise.reject(
        new Error("Network error. Please check your connection.")
      );
    }

    return Promise.reject(error);
  }
);

export default api;