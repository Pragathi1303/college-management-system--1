import axiosInstance from './axios';

const courseService = {
  getAll: (params) => axiosInstance.get('/admin/courses', { params }),
  create: (data) => axiosInstance.post('/admin/courses', data),
  update: (id, data) => axiosInstance.put(`/admin/courses/${id}`, data),
  delete: (id) => axiosInstance.delete(`/admin/courses/${id}`),
};

export default courseService;