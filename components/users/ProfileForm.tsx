// components/users/ProfileForm.tsx
import React, { useState } from "react";
import API from "../../utils/api";

export default function ProfileForm({ user }: { user: any }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.put("/auth/me/", { name, email });
      alert("Saved");
    } catch (err) {
      console.error(err);
      alert("Failed");
    }
  };

  return (
    <form onSubmit={save}>
      <div>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}
