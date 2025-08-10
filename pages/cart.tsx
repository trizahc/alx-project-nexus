// pages/cart.tsx
import React from "react";
import { useCart } from "../components/cart/CartContext";
import DeleteCartItemButton from "../components/common/DeleteCartItemButton";
import PlaceOrderButton from "../components/common/PlaceOrderButton";

export default function CartPage() {
  const { items, total } = useCart();
  return (
    <div style={{ padding: 20 }}>
      <h1>Your Cart</h1>
      {items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul>
            {items.map((it: any) => (
              <li key={it.product.id} style={{ marginBottom: 12 }}>
                <strong>{it.product.name}</strong> x {it.quantity} — {it.product.price}
                <DeleteCartItemButton itemId={it.id} />
              </li>
            ))}
          </ul>
          <p>Total: {total}</p>
          <PlaceOrderButton />
        </>
      )}
    </div>
  );
}
