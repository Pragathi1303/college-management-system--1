import api from "../utils/axios";

/**
 * Submit a college application.
 * @param {Object} applicationData - { name, email, phone, dob, course, school, percentage, city, bio }
 * @returns {Promise<Object>}
 */
export async function submitApplication(applicationData) {
  const response = await api.post("/api/applications", applicationData);
  return response.data;
}