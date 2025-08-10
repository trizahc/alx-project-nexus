// pages/orders/index.tsx
import React, { useEffect, useState } from "react";
import API from "@/utils/api";
import Link from "next/link";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => {
    API.get("/orders/").then((r: { data: any; }) => setOrders(r.data || [])).catch(() => {});
  }, []);
  return (
    <div style={{ padding: 20 }}>
      <h1>My Orders</h1>
      <ul>{orders.map((o) => <li key={o.id}><Link href={`/orders/${o.id}`}>{o.id}</Link></li>)}</ul>
    </div>
  );
}
