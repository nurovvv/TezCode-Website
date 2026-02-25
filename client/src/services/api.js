import axios from 'axios';

const api = axios.create({
    baseURL: '',
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
    return config;
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('tezcode-refresh');
                if (!refreshToken) throw new Error('No refresh token');

                const res = await axios.post('/api/auth/refresh', { refreshToken });
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
