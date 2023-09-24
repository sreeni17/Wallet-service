import axios from 'axios';

const hostname = window.location.host;
const isDevelopment = hostname.startsWith('localhost') || hostname.startsWith('127.0.0.1:8080');
const baseURL = isDevelopment ? 'http://localhost:3000/api' : '/api';

const axiosInstance = axios.create({ baseURL, timeout: 6000 });


export default axiosInstance;
