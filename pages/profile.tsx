// pages/profile.tsx
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import ProfileForm from "../components/users/ProfileForm";

export default function Profile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    API.get("/auth/me/").then((res) => setUser(res.data)).catch(() => {});
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Profile</h1>
      {user ? <ProfileForm user={user} /> : <p>Loading...</p>}
    </div>
  );
}
