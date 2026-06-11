import axiosInstance from './axios';

const announcementService = {
  getAll: (params) => axiosInstance.get('/admin/announcements', { params }),
  create: (data) => axiosInstance.post('/admin/announcements', data),
  update: (id, data) => axiosInstance.put(`/admin/announcements/${id}`, data),
  delete: (id) => axiosInstance.delete(`/admin/announcements/${id}`),
};

export default announcementService;