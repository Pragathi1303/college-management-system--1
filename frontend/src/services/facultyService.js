import axiosInstance from './axios';

const facultyService = {
  getAll: (params) => axiosInstance.get('/admin/faculty', { params }),
  create: (data) => axiosInstance.post('/admin/faculty', data),
  update: (id, data) => axiosInstance.put(`/admin/faculty/${id}`, data),
  delete: (id) => axiosInstance.delete(`/admin/faculty/${id}`),
};

export default facultyService;