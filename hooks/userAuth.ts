// hooks/useAuth.ts
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

interface User {
  id: string | number;
  name: string;
  email: string;
  avatar?: string;
  username?: string;
}

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAuthData = useCallback(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadAuthData();
    window.addEventListener("storage", loadAuthData);
    return () => window.removeEventListener("storage", loadAuthData);
  }, [loadAuthData]);

  const login = async (username: string, password: string) => {
    setError(null);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login/`,
        { username, password }
      );

      // Adjust based on actual backend response
      const token = res.data.token || res.data.access;
      const userData = res.data.user || res.data;

      if (!token || !userData) {
        throw new Error("Invalid response from server");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed");
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const getToken = () => localStorage.getItem("token");

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    getToken,
  };
}
