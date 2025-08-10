// pages/admin/login.tsx
import React, { useState } from "react";
import API from "../../utils/api";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const r = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login/", { email, password });
      const token = res.data.token || res.data.access;
      if (token) {
        localStorage.setItem("token", token);
        r.push("/admin");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={submit} style={{ padding: 20 }}>
      <h1>Admin Login</h1>
      <div><input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
      <div><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
      <button type="submit">Login</button>
    </form>
  );
}
