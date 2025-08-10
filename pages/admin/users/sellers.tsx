// pages/admin/users/sellers.tsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import API from "../../../utils/api";

export default function AdminSellers() {
  const [sellers, setSellers] = useState<any[]>([]);
  useEffect(() => {
    API.get("/users/sellers/").then((r) => setSellers(r.data || [])).catch(() => {});
  }, []);
  return (
    <AdminLayout>
      <h1>Sellers</h1>
      <ul>{sellers.map((s) => <li key={s.id}>{s.email}</li>)}</ul>
    </AdminLayout>
  );
}
