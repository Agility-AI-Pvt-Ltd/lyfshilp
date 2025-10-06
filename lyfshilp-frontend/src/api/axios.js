import axios from "axios";

// Base URL tumhare backend ka (Production URL from Google Cloud Run)
const api = axios.create({
  baseURL: "https://lyfshilp-backend-210425516679.asia-south1.run.app/api",
  withCredentials: true, // agar cookies / jwt use ho raha ho
});

export default api;
