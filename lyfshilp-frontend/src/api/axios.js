import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // ✅ must include /api
});

export default api;
