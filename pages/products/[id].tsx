import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import API from "@/utils/api";

interface ProductDetail {
  id: number;
  title: string;
  description: string;
  price: number;
}

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    API.get(`/products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch(() => setError("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-6">Loading product...</p>;
  if (error) return <p className="text-center mt-6 text-red-600">{error}</p>;
  if (!product) return <p className="text-center mt-6">Product not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="mb-4">{product.description}</p>
      <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
    </div>
  );
}
