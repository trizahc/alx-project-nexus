// utils/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://felikz97.pythonanywhere.com",
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers!["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
