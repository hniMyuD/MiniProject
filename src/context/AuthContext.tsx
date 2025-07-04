import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  login as apiLogin,
  logout as apiLogout,
  loginWithGoogle as googleLogin,
} from "@services/authService";


interface User {
  id: string;
  name: string;
  email: string;
}
interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (googleToken: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email: string, password: string) => {
    try {
      const { token, user } = await apiLogin(email, password);
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (token) {
        navigate("/homepage");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
    }
  };

  const loginWithGoogle = async (googleToken: string) => {
    try {
      const { token, user } = await googleLogin(googleToken);
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (token) {
        navigate("/homepage");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Clear local state regardless of API success
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated: !!token, user, login, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
