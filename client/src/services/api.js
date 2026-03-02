import axios from 'axios';

// Base URL for backend.
const VITE_API_URL = import.meta.env.VITE_API_BASE_URL;

if (!VITE_API_URL && !import.meta.env.DEV) {
    console.warn('[API] VITE_API_BASE_URL is not set! Using hardcoded fallback.');
}

// Ensure the base URL is just the domain (no /api suffix) to avoid Axios path replacement bugs
const API_BASE_URL = (VITE_API_URL || (import.meta.env.DEV ? '' : 'https://tezcode-backend.onrender.com')).replace(/\/+$/, '');

const api = axios.create({
    baseURL: API_BASE_URL || undefined, // undefined uses local relative paths
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add auth token and ensure /api prefix
api.interceptors.request.use((config) => {
    // Force /api prefix if missing (and not an absolute URL)
    if (config.url && !config.url.startsWith('/api') && !config.url.startsWith('http')) {
        config.url = `/api${config.url.startsWith('/') ? '' : '/'}${config.url}`;
    }

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
            // DO NOT auto-redirect for login/register/google-auth. 
            // We want the user to see "Invalid credentials" or other errors.
            const isAuthRoute = originalRequest.url.includes('/auth/login') ||
                originalRequest.url.includes('/auth/register') ||
                originalRequest.url.includes('/auth/google-auth');

            if (isAuthRoute) {
                return Promise.reject(error);
            }

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
                window.location.href = import.meta.env.BASE_URL + 'login';
            }
        }

        return Promise.reject(error);
    }
);

export default api;
