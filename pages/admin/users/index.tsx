// pages/admin/users/index.tsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import API from "../../../utils/api";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    API.get("/users/").then((r) => setUsers(r.data || [])).catch(() => {});
  }, []);
  return (
    <AdminLayout>
      <h1>Users</h1>
      <ul>{users.map((u) => <li key={u.id}>{u.email}</li>)}</ul>
    </AdminLayout>
  );
}
