// components/Product/ProductCard.tsx
import Link from "next/link";
import React from "react";
import AddToCartButton from "../common/AddToCartButton";
import { Product as ProductType, Seller } from "@/types/Product";

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = Number(product.price ?? 0);
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\.$/, "") || "http://localhost:8000";

  // Ensure image URL works for both dev and prod
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${API_BASE_URL}${product.image}`
    : null;

  // Safely extract seller object
  const seller: Seller | null =
    product.seller && typeof product.seller === "object"
      ? { id: product.seller.id, username: product.seller.username }
      : null;

  // Ensure AddToCartButton only receives a valid product
  const cartProduct = product.id
    ? {
        id: product.id,
        name: product.name ?? "Unnamed Product",
        price,
        description: product.description ?? "",
        stock: product.stock ?? 0,
        image: product.image ?? null,
        sizes: product.sizes ?? [],
        colors: product.colors ?? [],
        seller,
        shoe_sizes: product.shoe_sizes ?? [],
        category: product.category ?? null,
      }
    : null;

  return (
    <div className="border p-4 rounded shadow-sm">
      {/* Product Image */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover mb-2 rounded"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 rounded mb-2">
          No Image
        </div>
      )}

      {/* Product Details */}
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.description ?? ""}</p>
      <p className="font-semibold mb-2">Ksh {price.toFixed(2)}</p>

      {product.category && typeof product.category !== "string" && (
        <p className="text-gray-500 mb-2">Category: {product.category.name}</p>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        {/* View Product Button */}
        <Link href={`/products/${product.id}`}>
          <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
            View
          </button>
        </Link>

        {/* Add to Cart Button */}
        {cartProduct && <AddToCartButton product={cartProduct} />}
      </div>
    </div>
  );
}
