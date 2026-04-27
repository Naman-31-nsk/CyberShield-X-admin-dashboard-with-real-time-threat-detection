/* src/utils/api.js
   Axios instance pre-configured for the CyberShield backend.

   The backend uses API-key auth: every request needs the header
     x-api-key: <your key>

   Generate a key first:
     POST /api/auth/generate-key  { name, targetUrl }
   Then store it and set it here (or via .env).
*/
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";
const API_KEY  = process.env.REACT_APP_API_KEY  || "";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    ...(API_KEY ? { "x-api-key": API_KEY } : {}),
  },
});

/* Attach latest API key before every request (supports runtime updates) */
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
