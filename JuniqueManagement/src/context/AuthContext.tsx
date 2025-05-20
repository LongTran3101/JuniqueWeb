import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface User {
  email?: string;
  name?: string;
  username?: string;
  role?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, userInfo: User, expireDate: number) => void;
  logout: () => void;
  user: User | null;
  tryRefreshToken: () => Promise<boolean>; // thêm dòng này
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => { },
  logout: () => { },
  user: null,
  tryRefreshToken: async () => false, // thêm dòng này
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('accessToken'));
  const storedUser = localStorage.getItem('userInfo');
  const [user, setUser] = useState<User | null>(() => {
    if (storedUser && storedUser.trim() !== "") {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error("Failed to parse storedUser:", e);
        return null;
      }
    }
    return null;
  });

  const login = (token: string, userInfo: User, expireDate: number) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    localStorage.setItem('expireDate', expireDate.toString());
    setUser(userInfo);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('expireDate');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');  // Dùng useNavigate thay vì window.location.href
  };

  const isTokenExpired = () => {
    const expireDateStr = localStorage.getItem('expireDate');
    if (!expireDateStr || expireDateStr?.trim() == "" || Number.isNaN(parseInt(expireDateStr, 10))) return true;
    const expireTime = parseInt(expireDateStr, 10);
    return Date.now() > expireTime;
  };

  const tryRefreshToken = async (): Promise<boolean> => {
    const token = localStorage.getItem("accessToken");
    const expireDateStr = localStorage.getItem("expireDate");

    // Nếu thiếu token hoặc expireDate => không cần gọi refresh
    if (!token || !expireDateStr || expireDateStr.trim() === "") {
      return false;
    }

    // Nếu token vẫn còn hạn => OK
    if (!isTokenExpired()) return true;

    try {
      const res = await fetch("http://localhost:8080/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Refresh failed");

      const data = await res.json();
      const newToken = data.accessToken;

      let newExp = 0;
      try {
        const payloadBase64 = newToken.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        newExp = decodedPayload.exp * 1000;
      } catch {
        newExp = Date.now() + 60 * 1000;
      }

      const storedUserInfo = localStorage.getItem("userInfo");
      const userInfo: User = storedUserInfo ? JSON.parse(storedUserInfo) : {};

      login(newToken, userInfo, newExp);
      return true;
    } catch (err) {
      console.error("Refresh failed:", err);
      return false;
    }
  };

  useEffect(() => {
    tryRefreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, tryRefreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
