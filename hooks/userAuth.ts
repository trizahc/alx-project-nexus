// hooks/useAuth.ts
import { useEffect, useState } from "react";

interface User {
  id: string | number;
  name: string;
  email: string;
   avatar?: string;   // optional so it won’t error if missing
  username?: string;
  // add more fields from your API response if needed
}

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null); // ✅ fixed variable name
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage when the hook runs
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

  const login = (userData: User, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const getToken = () => localStorage.getItem("token");

  return {
    user, // ✅ now matches what you destructure in Header
    isAuthenticated,
    loading,
    login,
    logout,
    getToken,
  };
}
