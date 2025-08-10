// components/common/AddToCartButton.tsx
import React from "react";
import API from "../../utils/api";
import { useCart } from "../cart/CartContext";

export default function AddToCartButton({ product, qty = 1 }: { product: any; qty?: number }) {
  const { reload } = useCart();

  const add = async () => {
    try {
      await API.post("/cart/add/", { product_id: product.id, quantity: qty });
      reload();
      alert("Added to cart");
    } catch (err) {
      console.error(err);
      alert("Failed to add");
    }
  };

  return <button onClick={add}>Add to cart</button>;
}
