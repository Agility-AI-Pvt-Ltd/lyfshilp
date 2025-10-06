import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ App load hone par token se user fetch
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  // 🔹 Fetch user info from backend
  const fetchUserProfile = async (token) => {
    try {
      const res = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user || res.data); // backend se user object (handle both formats)
    } catch (err) {
      console.error("Failed to fetch user:", err);
      logout(); // invalid token → clear everything
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Login
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    setUser(user);
  };

  // 🔹 Register
  const register = async (username, email, password) => {
    const res = await api.post("/auth/register", { username, email, password });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    setUser(user);
  };

  // 🔹 Logout
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
