import api from "../../services/api";

const BASE_URL = import.meta.env.VITE_API_URL

export const login = (data) => api.post( BASE_URL + "/auth/login", data);
export const register = (data) => api.post( BASE_URL + "/auth/register", data);
export const logout = () => api.post("/auth/logout");
export const forgotPassword = (email) => api.post("/auth/forgot-password", { email });
export const resetPassword = (token, password) => api.post(`/auth/reset-password/${token}`, { password });