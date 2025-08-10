// pages/admin/products/index.tsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import API from "../../../utils/api";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    API.get("/products/").then((r) => setProducts(r.data || [])).catch(() => {});
  }, []);

  return (
    <AdminLayout>
      <h1>Products</h1>
      <ul>{products.map((p) => <li key={p.id}>{p.name}</li>)}</ul>
    </AdminLayout>
  );
}
