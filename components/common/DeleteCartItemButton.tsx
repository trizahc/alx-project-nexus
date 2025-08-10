// components/common/DeleteCartItemButton.tsx
import React from "react";
import API from "../../utils/api";
import { useCart } from "../cart/CartContext";

export default function DeleteCartItemButton({ itemId }: { itemId: number }) {
  const { reload } = useCart();
  const remove = async () => {
    try {
      await API.delete(`/cart/items/${itemId}/`);
      reload();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };
  return <button onClick={remove} style={{ marginLeft: 8 }}>Delete</button>;
}
