import { useCallback, useState } from 'react';
import api from '../api/client';

export function useAuth(){
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('access_token')
    );
    const login = useCallback(async (username: string, password: string) => {
        const resp = await api.post('/auth/token/', { username, password });
        const { access, refresh } = resp.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        setToken(access);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setToken(null);
    }, []);
    return {
        token,
        login,
        logout,
        isAuthenticated: !!token,
    };
}