import axios from 'axios';

const hostname = window.location.host;
const isDevelopment = hostname.startsWith('localhost') || hostname.startsWith('127.0.0.1:8080');
const baseURL = isDevelopment ? 'https://kube-genai-agent-creator.service.intradsm1.sdeconsul.csnzoo.com' : 'https://kube-genai-agent-creator.service.intradsm1.sdeconsul.csnzoo.com';

const axiosInstance = axios.create({ baseURL, timeout: 6000 });

export default axiosInstance;