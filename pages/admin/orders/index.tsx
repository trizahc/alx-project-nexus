// pages/admin/orders/index.tsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import API from "../../../utils/api";
import Link from "next/link";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => {
    API.get("/orders/").then((r) => setOrders(r.data || [])).catch(() => {});
  }, []);
  return (
    <AdminLayout>
      <h1>Orders</h1>
      <ul>{orders.map((o) => <li key={o.id}><Link href={`/admin/orders/${o.status}`}>{o.id} - {o.status}</Link></li>)}</ul>
    </AdminLayout>
  );
}
