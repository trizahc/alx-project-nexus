// components/cart/CartDrawer.tsx
import React from "react";
import { useCart } from "./CartContext";
import Link from "next/link";

export default function CartDrawer() {
  const { items } = useCart();
  return (
    <div style={{ position: "fixed", right: 12, bottom: 12, width: 320, border: "1px solid #ddd", padding: 12, background: "#fff" }}>
      <h4>Cart</h4>
      {items.length === 0 ? <p>Empty</p> : items.map((it: any) => <div key={it.id}>{it.product.name} x {it.quantity}</div>)}
      <div style={{ marginTop: 8 }}>
        <Link href="/cart"><button>Open Cart</button></Link>
      </div>
    </div>
  );
}
