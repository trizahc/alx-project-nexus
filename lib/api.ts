// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api`
    : "https://felikz2254.pythonanywhere.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;