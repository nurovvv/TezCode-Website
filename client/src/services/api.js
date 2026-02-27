import axios from 'axios';

// Base URL for API requests. In dev we usually hit the Vite proxy at /api.
// In production (GitHub Pages) this should be set via VITE_API_BASE_URL to your backend URL.
const VITE_API_URL = import.meta.env.VITE_API_BASE_URL;

if (!VITE_API_URL && !import.meta.env.DEV) {
    console.warn('[API] VITE_API_BASE_URL is not set! API calls will likely fail on static host.');
}

const API_BASE_URL = VITE_API_URL || (import.meta.env.DEV ? '/api/' : '/api/');

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('tezcode-token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
    return config;
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => {
        console.log(`[API Response] ${response.status} ${response.config.url}`, response.data);
        return response;
    },
    async (error) => {
        console.error(`[API Error] ${error.response?.status} ${error.config?.url}`, error.response?.data || error.message);
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('tezcode-refresh');
                if (!refreshToken) throw new Error('No refresh token');

                const res = await api.post('/auth/refresh', { refreshToken });
                const { accessToken } = res.data;

                localStorage.setItem('tezcode-token', accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return api(originalRequest);
            } catch {
                localStorage.removeItem('tezcode-token');
                localStorage.removeItem('tezcode-refresh');
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default api;
