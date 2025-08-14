// pages/products/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import AddToCartButton from "@/components/common/AddToCartButton";
import { Product as ProductType, Seller } from "@/types/Product";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\.$/, "") || "http://localhost:8000";

  useEffect(() => {
    if (!id) return;

    const productId = Number(id);
    if (isNaN(productId)) return;

    const url = `${API_BASE_URL}/api/products/${productId}/`;
    console.log("Fetching product from URL:", url);

    axios
      .get(url)
      .then((res) => {
        const data: ProductType = {
          id: res.data.id,
          name: res.data.name ?? "Unnamed Product",
          price: Number(res.data.price) || 0,
          description: res.data.description ?? "",
          stock: res.data.stock ?? 0,
          image: res.data.image ?? null,
          sizes: res.data.sizes ?? [],
          colors: res.data.colors ?? [],
          shoe_sizes: res.data.shoe_sizes ?? [],
          category: res.data.category ?? null,
          seller: res.data.seller
            ? { id: res.data.seller.id, username: res.data.seller.username } as Seller
            : null,
        };
        setProduct(data);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setError("Product not found.");
        } else {
          console.error("Error loading product:", err);
          setError("Failed to load product. Check the API URL or network.");
        }
      })
      .finally(() => setLoading(false));
  }, [id, API_BASE_URL]);

  if (loading) return <p className="p-6 text-center">Loading product...</p>;
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>;
  if (!product) return <p className="p-6 text-center text-red-600">Product not found.</p>;

  const imageUrl = product.image?.startsWith("http") ? product.image : `${API_BASE_URL}${product.image}`;

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-6">
      {/* Product Image */}
      <div className="relative w-full md:w-1/2 h-80">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-between md:w-1/2">
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">{product.name}</h1>
          <p className="text-green-700 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-green-900 mb-1">
            Ksh {product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            Stock available: <span className="font-semibold">{product.stock}</span>
          </p>

          {/* Sizes */}
          {product.sizes.length > 0 && (
            <div className="mb-3">
              <h2 className="text-sm font-semibold text-green-800">Available Sizes:</h2>
              <div className="flex gap-2 mt-1 flex-wrap">
                {product.sizes.map((size, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 border rounded text-sm text-green-900 bg-green-100"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="mb-3">
              <h2 className="text-sm font-semibold text-green-800">Colors:</h2>
              <div className="flex gap-2 mt-1 flex-wrap">
                {product.colors.map((color, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 border rounded text-sm text-green-900 bg-green-100"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Seller Info */}
          {product.seller?.username && (
            <p className="text-sm text-gray-500 mt-1">
              Sold by: <span className="font-semibold text-green-700">{product.seller.username}</span>
            </p>
          )}
        </div>

        {/* Add to Cart */}
        <div className="mt-6">
          {product && <AddToCartButton product={product} />}
        </div>
      </div>
    </div>
  );
}
