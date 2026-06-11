import axiosInstance from './axios';

const attendanceService = {
  getAll: (params) => axiosInstance.get('/admin/attendance', { params }),
  create: (data) => axiosInstance.post('/admin/attendance', data),
  createBulk: (records) => axiosInstance.post('/admin/attendance/bulk', { records }),
  update: (id, data) => axiosInstance.put(`/admin/attendance/${id}`, data),
  delete: (id) => axiosInstance.delete(`/admin/attendance/${id}`),
};

export default attendanceService;