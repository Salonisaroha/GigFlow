import axios from "axios";

// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
//     withCredentials: true,
// });

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_URL?.startsWith("http")
    ? API_URL
    : `https://${API_URL}`,
  withCredentials: true,
});

export default api;