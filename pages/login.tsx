// pages/login.tsx
import React, { useState } from "react";
import API from "../utils/api";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/auth/login/", { email, password });
      const token = res.data.token || res.data.access;
      if (token) {
        localStorage.setItem("token", token);
        router.push("/");
      } else {
        setError("No token returned from server");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-4">
      <form
        onSubmit={submit}
        className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>

        {error && (
          <div className="mb-4 text-red-600 text-center font-semibold">{error}</div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-1 font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            placeholder="Your password"
          />
        </div>
         <div className="flex justify-between items-center mb-6">
          <a
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white font-semibold rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          } transition-colors duration-200`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
