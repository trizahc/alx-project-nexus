// components/cart/CartContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../../utils/api";

const CartContext = createContext<any>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await API.get("/cart/");
      setItems(res.data.items || res.data || []);
    } catch (err) {
      console.error(err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const reload = () => load();
  const total = items.reduce((s: number, it: any) => s + (it.product?.price || 0) * it.quantity, 0);

  return <CartContext.Provider value={{ items, loading, reload, total }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside provider");
  return ctx;
};
