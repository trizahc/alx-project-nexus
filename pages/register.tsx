// pages/register.tsx
import React, { useState } from "react";
import API from "../utils/api";
import { useRouter } from "next/router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const r = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/auth/register/", { email, password });
      alert("Registered. Please log in.");
      r.push("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={submit} style={{ padding: 20 }}>
      <h1>Register</h1>
      <div>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
