import axiosInstance from './axios';

const analyticsService = {
  getData: () => axiosInstance.get('/admin/analytics'),
};

export default analyticsService;