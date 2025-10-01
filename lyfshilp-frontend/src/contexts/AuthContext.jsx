// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

// Context create kiya
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Page reload hone par token check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Recommended: Backend se "/auth/me" call karke fresh user info fetch karo
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  // ✅ Backend se user fetch
  const fetchUserProfile = async (token) => {
    try {
      const res = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔑 Login
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;

      // Token save
      localStorage.setItem("token", token);

      // State update
      setUser(user || { token });
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  // 📝 Register
  const register = async (username, email, password) => {
    try {
      const res = await api.post("/auth/register", {
        username,
        email,
        password,
      });
      const { token, user } = res.data;

      // Token save
      localStorage.setItem("token", token);

      // State update
      setUser(user || { token });
    } catch (err) {
      console.error("Registration failed:", err);
      throw err;
    }
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
