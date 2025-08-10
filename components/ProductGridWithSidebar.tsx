// components/ProductGridWithSidebar.tsx
import React from "react";
import ProductCard from "./Product/ProductCard";

export default function ProductGridWithSidebar({ products }: { products: any[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
