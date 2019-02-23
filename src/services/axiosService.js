import axios from 'axios';
import authService from './authService';

class AxiosService {
  axiosInstance = {};

  constructor() {
    this.initInstance();
  }

  initInstance() {
    this.axiosInstance = axios.create({
      baseURL: '/api/v1',
      timeout: 1000
    });

    this.axiosInstance.interceptors.request.use(config => {
      const token = authService.getToken();

      if (token) {
        // we add custom 'Authorization' property to config.headers
        // and set its value to `Bearer ###########`
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    return this.axiosInstance;
  }

  getInstance() {
    return this.axiosInstance || this.initInstance();
  }
}

export default new AxiosService();
