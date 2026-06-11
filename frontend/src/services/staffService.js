import api from "../utils/axios";

/**
 * Get all staff members.
 * @returns {Promise<Array>}
 */
export async function getAllStaff() {
  const response = await api.get("/staff");
  return response.data;
}

/**
 * Search staff by query string.
 * @param {string} query
 * @returns {Promise<Array>}
 */
export async function searchStaff(query) {
  const response = await api.get(`/staff/search?q=${encodeURIComponent(query)}`);
  return response.data;
}

/**
 * Add a new staff member.
 * @param {Object} staffData - { staffId, name, department, designation, email, phone, salary }
 * @returns {Promise<Object>}
 */
export async function addStaff(staffData) {
  const response = await api.post("/staff", staffData);
  return response.data;
}

/**
 * Update an existing staff member.
 * @param {string} staffId
 * @param {Object} staffData
 * @returns {Promise<Object>}
 */
export async function updateStaff(staffId, staffData) {
  const response = await api.put(`/staff/${staffId}`, staffData);
  return response.data;
}

/**
 * Delete a staff member by staffId.
 * @param {string} staffId
 * @returns {Promise<Object>}
 */
export async function deleteStaff(staffId) {
  const response = await api.delete(`/staff/${staffId}`);
  return response.data;
}