import axios from "axios";

const api = axios.create({
  baseURL: "https://lyfshilp-backend-210425516679.asia-south1.run.app/api", // Production backend URL from Google Cloud Run
});

// Add JWT automatically if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
