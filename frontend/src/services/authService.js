import api from "../utils/axios";

/**
 * Register a new user account.
 * @param {Object} params - { name, email, password }
 * @returns {Promise<{token, user}>}
 */
export async function registerUser({ name, email, password }) {
  const response = await api.post("/api/auth/register", {
    name,
    email,
    password,
  });
  return response.data;
}

/**
 * Login a user with email and password.
 * @param {Object} params - { email, password }
 * @returns {Promise<{token, user}>}
 */
export async function loginUser({ email, password }) {
  const response = await api.post("/api/auth/login", { email, password });
  return response.data;
}

/**
 * Admin login with username and password.
 * @param {Object} params - { username, password }
 * @returns {Promise<{token, user}>}
 */
export async function adminLogin({ username, password }) {
  // Backend in this repo exposes only student auth endpoints under /api/auth.
  // Map admin username -> email so admin accounts can be created/used.
  const response = await api.post("/api/auth/login", {
    email: username,
    password,
  });
  return response.data;
}


/**
 * Get current authenticated user profile.
 * @returns {Promise<{id, name, email, role}>}
 */
export async function getCurrentUser() {
  const response = await api.get("/api/auth/me");
  return response.data;
}

/**
 * Send forgot password email.
 * @param {string} email
 * @returns {Promise<{message}>}
 */
export async function forgotPassword({ email }) {
  const response = await api.post("/api/auth/forgot", { email });
  return response.data;
}