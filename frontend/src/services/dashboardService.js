import axiosInstance from './axios';

const dashboardService = {
  getStats: () => axiosInstance.get('/admin/dashboard'),
};

export default dashboardService;