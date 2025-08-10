import { useEffect, useState } from "react";
import Link from "next/link";
import API from "@/utils/api";

interface Product {
  id: number;
  title: string;
  price: number;
}

export default function MyProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/products/mine/")  // Adjust endpoint based on your API
      .then((res) => setProducts(res.data))
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-6">Loading your products...</p>;
  if (error) return <p className="text-center mt-6 text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Products</h1>
      <Link href="/products/create" className="inline-block mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        + Add New Product
      </Link>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center border p-4 rounded shadow"
            >
              <div>
                <h2 className="font-semibold text-lg">{product.title}</h2>
                <p>${product.price.toFixed(2)}</p>
              </div>
              <Link href={`/products/${product.id}/edit`} className="text-blue-600 hover:underline">
                Edit
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
