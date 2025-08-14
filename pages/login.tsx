import React, { useState } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/userAuth"; // ✅ direct hook import

export default function Login() {
  const { login, error: authError } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Please enter your username");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);
    try {
      await login(username, password); // ✅ use hook method
      router.push("/"); // ✅ redirect after success
    } catch {
      setError(authError || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-4">
      <form
        onSubmit={submit}
        className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full"
        noValidate
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h1>

        {(error || authError) && (
          <div className="mb-4 text-red-600 text-center font-semibold">
            {error || authError}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            placeholder="Your username"
            autoComplete="username"
          />
        </div>

        <div className="mb-6 relative">
          <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            placeholder="Your password"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 text-sm text-gray-600 hover:text-gray-800"
            tabIndex={-1}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
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
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } transition-colors duration-200`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
