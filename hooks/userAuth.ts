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

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/me/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const userData = res.data;
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      console.warn("Token verification failed, logging out");
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  const loadAuthData = useCallback(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    verifyToken();
    window.addEventListener("storage", loadAuthData);
    return () => window.removeEventListener("storage", loadAuthData);
  }, [verifyToken, loadAuthData]);

  const login = async (username: string, password: string) => {
    setError(null);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login/`,
        { username, password }
      );

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
