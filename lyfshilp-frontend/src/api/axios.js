import axios from "axios";

// Base URL tumhare backend ka (Production URL from Google Cloud Run)
const api = axios.create({
  baseURL: "https://lyfshilp-backend-210425516679.asia-south1.run.app/api",
  withCredentials: true, // agar cookies / jwt use ho raha ho
});

// Add JWT token to all requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;