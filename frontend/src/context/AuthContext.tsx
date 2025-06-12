import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import api from '../api/client';

interface AuthContextType {
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));


    useEffect(() => {
        if (token) {
            localStorage.setItem('access_token', token);
        } else {
            localStorage.removeItem('access_token');
        }
    }, [token]);

    const login = async (username: string, password: string) => {
        const resp      = await api.post('/auth/token/', { username, password });
        setToken(resp.data.access);
        localStorage.setItem('refresh_token', resp.data.refresh);
    };
    const logout = () => {
    setToken(null);
    localStorage.removeItem('refresh_token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve essere usato dentro AuthProvider');
  return ctx;
}