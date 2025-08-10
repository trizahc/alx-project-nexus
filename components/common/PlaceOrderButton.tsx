// components/common/PlaceOrderButton.tsx
import React from "react";
import API from "../../utils/api";
import { useRouter } from "next/router";
import { useCart } from "../cart/CartContext";

export default function PlaceOrderButton() {
  const r = useRouter();
  const { items, reload } = useCart();

  const place = async () => {
    if (items.length === 0) return alert("Cart empty");
    try {
      const res = await API.post("/orders/", { items });
      reload();
      r.push(`/orders/${res.data.id}`);
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  return <button onClick={place}>Place Order</button>;
}
