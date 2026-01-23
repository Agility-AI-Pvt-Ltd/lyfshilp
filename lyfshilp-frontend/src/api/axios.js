import axios from "axios";

// Base URL for local development
const api = axios.create({
  baseURL: "http://localhost:4000/api",
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

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:4000/api", // ✅ must include /api
// });

// export default api;
