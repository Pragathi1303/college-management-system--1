import axiosInstance from './axios';

const authService = {
  login: (email, password) => axiosInstance.post('/admin/login', { email, password }),
  register: (name, email, password) => axiosInstance.post('/admin/register', { name, email, password }),
  getProfile: () => axiosInstance.get('/admin/profile'),
  updateProfile: (data) => axiosInstance.put('/admin/profile', data),
  changePassword: (currentPassword, newPassword) =>
    axiosInstance.put('/admin/change-password', { currentPassword, newPassword }),
};

export default authService;