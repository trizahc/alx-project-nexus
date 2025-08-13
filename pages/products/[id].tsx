// pages/products/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Product } from "@/types/Product";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    api
      .get(`/products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error("Error loading product:", err);
        setError("Failed to load product");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-6">Loading product...</p>;
  if (error) return <p className="text-center mt-6 text-red-600">{error}</p>;
  if (!product) return <p className="text-center mt-6">Product not found</p>;

  // Safely convert price to number with fallback
  const price = product.price ? Number(product.price) : 0;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <button
        onClick={() => router.back()}
        className="mb-4 text-blue-600 hover:underline"
      >
        &larr; Back
      </button>

      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover mb-4 rounded"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      {product.category && (
        <p className="mb-2 text-gray-500">Category: {product.category.name}</p>
      )}
      <p className="mb-4">{product.description ?? ""}</p>
      <p className="text-xl font-semibold">Ksh {price.toFixed(2)}</p>
    </div>
  );
}
