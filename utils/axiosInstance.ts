import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://felikz97.pythonanywhere.com",
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        // Use the AxiosHeaders methods instead of assigning an object
        config.headers = config.headers ?? new axios.AxiosHeaders();
        config.headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
