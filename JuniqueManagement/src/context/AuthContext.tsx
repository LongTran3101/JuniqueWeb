import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  email?: string,
  name?: string,
  username?: string,
  role?: string,
}
interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string,userInfo: User) => void;
  logout: () => void;
  user: User;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => { },
  logout: () => { },
  user: {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem('accessToken')
  );
  const storedUser = localStorage.getItem('userInfo');
  const [user, setUser] = useState<User>(() => {
    if (storedUser && storedUser.trim() !== "") {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error("Failed to parse storedUser:", e);
        return {} as User;
      }
    }
    return {} as User;
  });


  const login = (token: string, userInfo: User) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userInfo', JSON.stringify(userInfo)); // Chuyển object thành string JSON
    setUser(userInfo);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    setUser({});
    setIsAuthenticated(false);
    console.log("isAuthenticated /login " , isAuthenticated);
    window.location.href = '/login';
  };
  // Tự logout sau 15 phút không hoạt động (refresh token hết hạn)
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // Gọi API để giữ phiên nếu còn hoạt động
        await fetch('http://localhost:8080/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        });
      } catch (err) {
        logout();
      }
    }, 15 * 60 * 1000); // 15 phút

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,user }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
