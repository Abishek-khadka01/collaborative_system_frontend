import axios from 'axios';
import { useUserStore } from '../stores/UserStore';
// Create a dedicated axios instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});
instance.interceptors.request.use(config => {
    const token = useUserStore.getState().user?.accessToken;
    if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));
instance.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 400) {
        window.location.href = '/login';
    }
    return Promise.reject(error);
});
export default instance;
