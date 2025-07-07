import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  login as apiLogin,  logout as apiLogout,  loginWithGoogle as googleLogin, signUp as apiSignUp} from "@services/authService";
import { storage } from "@/utils/storage";

interface User {
  id: string;
  name: string;
  email: string;
  slogan?: string;
  dob?: string;
  avatar?: string;
}
interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (googleToken: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(
    storage.get<string>("token")
  );

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = storage.get<User>("user");
    return storedUser ? storedUser : null;
  });

  const login = async (email: string, password: string) => {
    try {
      const { token, user } = await apiLogin(email, password);
      setToken(token);
      setUser(user);
      storage.set<string>("token", token);
      storage.set<User>("user", user);

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
      storage.set<string>("token", token);
      storage.set<User>("user", user);

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
      storage.clear();
      setToken(null);
      setUser(null);
      navigate("/login");
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await apiSignUp(email, password);
      navigate("/login");
      alert("Sign up successful! Please log in.");
    } catch (error) {
      console.error("Sign up failed:", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated: !!token, user, login, loginWithGoogle, logout, signUp }}
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
