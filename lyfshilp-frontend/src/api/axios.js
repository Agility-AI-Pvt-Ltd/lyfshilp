import axios from "axios";

// Base URL tumhare backend ka (http://localhost:4000/api by default)
const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true, // agar cookies / jwt use ho raha ho
});

export default api;
