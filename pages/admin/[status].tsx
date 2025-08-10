// pages/admin/orders/[status].tsx
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AdminLayout from "../.././components/admin/AdminLayout";
import API from "../.././utils/api";

export default function OrdersByStatus() {
  const r = useRouter();
  const { status } = r.query;
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!status) return;
    API.get("/orders/", { params: { status } }).then((res) => setOrders(res.data || [])).catch(() => {});
  }, [status]);

  return (
    <AdminLayout>
      <h1>Orders: {String(status)}</h1>
      <ul>{orders.map((o) => <li key={o.id}>{o.id} - {o.status}</li>)}</ul>
    </AdminLayout>
  );
}
