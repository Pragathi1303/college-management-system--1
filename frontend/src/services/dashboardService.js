import api from "../utils/axios";

/**
 * Get dashboard statistics (admin only).
 * @returns {Promise<{totalStudents, totalStaff, totalCourses, totalDepartments}>}
 */
export async function getDashboardStats() {
  const response = await api.get("/api/dashboard/stats");
  return response.data;
}