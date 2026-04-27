/* src/utils/api.js */
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "https://cyber-shield-sage.vercel.app/api";
const API_KEY  = process.env.REACT_APP_API_KEY  || "";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    ...(API_KEY ? { "x-api-key": API_KEY } : {}),
  },
});

api.interceptors.request.use((config) => {
  const key = localStorage.getItem("cs_api_key") || API_KEY;
  if (key) config.headers["x-api-key"] = key;
  return config;
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message = err.response?.data?.message || err.message || "API error";
    console.error("[API]", message);
    return Promise.reject(new Error(message));
  }
);

export default api;
