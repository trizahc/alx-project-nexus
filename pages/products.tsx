// pages/products.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  // Add other fields as needed
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/`)
      .then((res) => {
        setProducts(res.data);
        setError("");
      })
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-6">Loading products...</p>;
  if (error) return <p className="text-center mt-6 text-red-600">{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 border rounded shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="mb-4">Ksh {product.price.toFixed(2)}</p>
            <Link href={`/products/${product.id}`}>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
