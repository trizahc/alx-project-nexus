// pages/shop.tsx
import React, { useEffect, useState } from "react";
import API from "@/utils/api";
import Link from "next/link";

interface Product {
  id: number | string;
  name: string;
  description?: string;
  price?: number | null;
  image?: string;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await API.get("/products/"); // Adjust endpoint as needed
        const data = response.data;

        // Ensure data is an array
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setError("Invalid product data format.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-700 text-lg">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-700 text-lg">No products available.</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow"
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 flex-grow mb-4">
              {product.description || "No description available."}
            </p>
            <p className="text-gray-700 font-bold mb-4">
              $
              {product.price !== undefined && product.price !== null
                ? product.price.toFixed(2)
                : "N/A"}
            </p>
            <Link
              href={`/products/${product.id}`}
              className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
