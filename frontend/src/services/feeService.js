import axiosInstance from './axios';

const feeService = {
  getAll: (params) => axiosInstance.get('/admin/fees', { params }),
  create: (data) => axiosInstance.post('/admin/fees', data),
  update: (id, data) => axiosInstance.put(`/admin/fees/${id}`, data),
  delete: (id) => axiosInstance.delete(`/admin/fees/${id}`),
};

export default feeService;