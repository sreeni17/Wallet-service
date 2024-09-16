import axios from 'axios';

const hostname = window.location.host;
const isDevelopment = hostname.startsWith('localhost') || hostname.startsWith('127.0.0.1:8080');
const baseURL = isDevelopment ? 'http://localhost:8000/' : '/';

const axiosInstance = axios.create({ baseURL, timeout: 6000 });

export default axiosInstance;
