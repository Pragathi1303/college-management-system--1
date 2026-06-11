import axiosInstance from './axios';

const departmentService = {
  getAll: (params) => axiosInstance.get('/admin/departments', { params }),
  getById: (id) => axiosInstance.get(`/admin/departments/${id}`),
  create: (data) => axiosInstance.post('/admin/departments', data),
  update: (id, data) => axiosInstance.put(`/admin/departments/${id}`, data),
  delete: (id) => axiosInstance.delete(`/admin/departments/${id}`),
};

export default departmentService;