// pages/admin/products/categories.tsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import API from "../../../utils/api";

export default function AdminCategories() {
  const [cats, setCats] = useState<any[]>([]);
  useEffect(() => {
    API.get("/categories/").then((r) => setCats(r.data || [])).catch(() => {});
  }, []);
  return (
    <AdminLayout>
      <h1>Categories</h1>
      <ul>{cats.map((c) => <li key={c.id}>{c.name}</li>)}</ul>
    </AdminLayout>
  );
}
