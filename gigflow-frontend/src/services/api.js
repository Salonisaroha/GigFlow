import axios from "axios";

const api = axios.create({
    baseURL: "https://gigflow-backend-production-07a5.up.railway.app/api" || "http://localhost:5000/api",
    withCredentials: true,
});


export default api;