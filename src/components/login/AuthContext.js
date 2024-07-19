import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
    console.log(userData)
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
  };

  const refreshAccessToken = async () => {
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const response = await axios.post('http://localhost:8080/member/refresh-token', { refreshToken });
        const { accessToken } = response.data;
        sessionStorage.setItem("accessToken", accessToken);
      } catch (error) {
        console.error('토큰 갱신 오류:', error);
        logout();
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};