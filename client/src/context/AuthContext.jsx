import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('ziyobook-token');
        if (token) {
            fetchUser(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async (token) => {
        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await api.get('/api/auth/me');
            setUser(res.data.user);
        } catch (err) {
            localStorage.removeItem('ziyobook-token');
            localStorage.removeItem('ziyobook-refresh');
            delete api.defaults.headers.common['Authorization'];
        } finally {
            setLoading(false);
        }
    };

    const login = useCallback(async (email, password) => {
        const res = await api.post('/api/auth/login', { email, password });
        const { accessToken, refreshToken, user: userData } = res.data;
        localStorage.setItem('ziyobook-token', accessToken);
        localStorage.setItem('ziyobook-refresh', refreshToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setUser(userData);
        return userData;
    }, []);

    const register = useCallback(async (name, email, password, role = 'student') => {
        const res = await api.post('/api/auth/register', { name, email, password, role });
        const { accessToken, refreshToken, user: userData } = res.data;
        localStorage.setItem('ziyobook-token', accessToken);
        localStorage.setItem('ziyobook-refresh', refreshToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setUser(userData);
        return userData;
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('ziyobook-token');
        localStorage.removeItem('ziyobook-refresh');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
    }, []);

    const refreshAccessToken = useCallback(async () => {
        try {
            const refreshToken = localStorage.getItem('ziyobook-refresh');
            if (!refreshToken) throw new Error('No refresh token');
            const res = await api.post('/api/auth/refresh', { refreshToken });
            const { accessToken } = res.data;
            localStorage.setItem('ziyobook-token', accessToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            return accessToken;
        } catch {
            logout();
            return null;
        }
    }, [logout]);

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, refreshAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
