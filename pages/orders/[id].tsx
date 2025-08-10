import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function OrderDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchOrder = async () => {
      try {
        const res = await fetch(`https://felikz97.pythonanywhere.com/api/orders/${id}/`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch order");
        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading order details...</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Order #{order.id}</h1>
      <p>Status: {order.status}</p>
      <p>Total Price: ${order.total_price}</p>
      <h3>Items:</h3>
      <ul>
        {order.items?.map((item: any) => (
          <li key={item.id}>
            {item.product_name} - Qty: {item.quantity} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
