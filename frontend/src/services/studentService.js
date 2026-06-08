import api from "../utils/axios";

/**
 * Get all students.
 * @returns {Promise<Array>}
 */
export async function getAllStudents() {
  const response = await api.get("/api/students");
  return response.data;
}

/**
 * Search students by query string.
 * @param {string} query
 * @returns {Promise<Array>}
 */
export async function searchStudents(query) {
  const response = await api.get(`/api/students/search?q=${encodeURIComponent(query)}`);
  return response.data;
}

/**
 * Add a new student.
 * @param {Object} studentData - { studentId, name, gender, dob, department, year, email, phone }
 * @returns {Promise<Object>}
 */
export async function addStudent(studentData) {
  const response = await api.post("/api/students", studentData);
  return response.data;
}

/**
 * Update an existing student.
 * @param {string} studentId
 * @param {Object} studentData
 * @returns {Promise<Object>}
 */
export async function updateStudent(studentId, studentData) {
  const response = await api.put(`/api/students/${studentId}`, studentData);
  return response.data;
}

/**
 * Delete a student by studentId.
 * @param {string} studentId
 * @returns {Promise<Object>}
 */
export async function deleteStudent(studentId) {
  const response = await api.delete(`/api/students/${studentId}`);
  return response.data;
}