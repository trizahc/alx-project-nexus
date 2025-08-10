// pages/orders/[id].tsx
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import API from "../../utils/api";

export default function OrderDetails() {
  const r = useRouter();
  const { id } = r.query;
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    API.get(`/orders/${id}/`).then((res) => setOrder(res.data)).catch(() => {});
  }, [id]);

  if (!order) return <p>Loading...</p>;
  return (
    <div style={{ padding: 20 }}>
      <h1>Order {order.id}</h1>
      <pre>{JSON.stringify(order, null, 2)}</pre>
    </div>
  );
}
