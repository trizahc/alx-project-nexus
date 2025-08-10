import React, { useState } from "react";
import API from "../utils/api";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Simple email validation regex
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage(null);
    setErrorMsg(null);

    if (!validateEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // Replace with your actual password reset API endpoint
      const response = await API.post("/auth/password-reset/", { email });
      setMessage("If this email exists, a password reset link has been sent.");
      setEmail("");
    } catch (error: any) {
      console.error(error.response || error);
      setErrorMsg(
        error.response?.data?.detail ||
          "Failed to send password reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white p-8 rounded shadow-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>

        {message && (
          <div className="mb-4 text-green-600 text-sm font-medium">{message}</div>
        )}

        {errorMsg && (
          <div className="mb-4 text-red-600 text-sm font-medium">{errorMsg}</div>
        )}

        <label className="block mb-2 font-semibold" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={loading}
          autoComplete="email"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          ) : null}
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="mt-4 text-center text-sm">
          Remembered?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
