import React from "react";
import ProductGridWithSidebar from "@/components/ProductGridWithSidebar";

export default function ProductsPage() {
  return (
    <div style={{ display: "flex", gap: 20, padding: 20 }}>
      <div style={{ flex: 1 }}>
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <ProductGridWithSidebar />
      </div>
    </div>
  );
}
