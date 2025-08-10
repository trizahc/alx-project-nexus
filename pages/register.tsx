import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !fullName.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/register/`,
        {
          username,
          full_name: fullName,
          email,
          password,
        }
      );

      alert("Registered successfully. Please log in.");
      router.push("/login");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || "Registration failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-indigo-600 p-4">
      <form
        onSubmit={submit}
        className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full"
        noValidate
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h1>

        {error && (
          <div className="mb-4 text-red-600 text-center font-semibold">{error}</div>
        )}

        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            placeholder="Your username"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fullName" className="block mb-1 font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            placeholder="Your full name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            placeholder="Your password"
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white font-semibold rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          } transition-colors duration-200`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
