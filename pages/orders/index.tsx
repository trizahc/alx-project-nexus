import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://felikz97.pythonanywhere.com/api/orders/", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <Link href={`/orders/${order.id}`}>
                Order #{order.id} - {order.status} - ${order.total_price}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
