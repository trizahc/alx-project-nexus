// pages/products.tsx
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import ProductCard from "../components/Product/ProductCard";
import ProductFilters from "../components/Product/ProductFilters";
import ProductGridWithSidebar from "../components/ProductGridWithSidebar";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/products/")
      .then((res) => setProducts(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: "flex", gap: 20, padding: 20 }}>
      <ProductFilters />
      <div style={{ flex: 1 }}>
        <h1>Products</h1>
        {loading ? <p>Loading...</p> : <ProductGridWithSidebar products={products} />}
      </div>
    </div>
  );
}
