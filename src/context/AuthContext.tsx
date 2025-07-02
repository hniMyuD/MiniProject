import { createContext, useContext, useState } from 'react';
import { login as apiLogin, logout as apiLogout } from '../services/authService';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

   const login = async (email: string, password: string) => {

    try {
      const { token } = await apiLogin(email, password);
      setToken(token);
      localStorage.setItem('token', token);
      if(token) {
        window.location.href = '/homepage';
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};