// pages/products.tsx
import React from "react";
import ProductFilters from "../components/Product/ProductFilters";
import ProductGridWithSidebar from "../components/ProductGridWithSidebar";

export default function ProductsPage() {
  return (
    <div style={{ display: "flex", gap: 20, padding: 20 }}>
      <ProductFilters />
      <div style={{ flex: 1 }}>
        <h1>Products</h1>
        <ProductGridWithSidebar />
      </div>
    </div>
  );
}
