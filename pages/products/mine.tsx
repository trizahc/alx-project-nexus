// pages/products/mine.tsx
import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import ProductCard from "../../components/Product/ProductCard";

export default function MyProducts() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    API.get("/products/mine/")
      .then((res) => setProducts(res.data || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>My Products</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
