import axiosInstance from './axios';

const studentService = {
  getAll: (params) => axiosInstance.get('/admin/students', { params }),
  getById: (id) => axiosInstance.get(`/admin/students/${id}`),
  create: (data) => axiosInstance.post('/admin/students', data),
  update: (id, data) => axiosInstance.put(`/admin/students/${id}`, data),
  delete: (id) => axiosInstance.delete(`/admin/students/${id}`),
};

export default studentService;