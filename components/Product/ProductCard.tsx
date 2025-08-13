// components/Product/ProductCard.tsx
import Link from "next/link";
import React from "react";
import AddToCartButton from "../common/AddToCartButton";
import { Product } from "@/types/Product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Safely convert price to number, fallback to 0
  const price = product.price ? Number(product.price) : 0;

  return (
    <div className="border p-4 rounded shadow-sm">
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover mb-2 rounded"
        />
      )}
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.description ?? ""}</p>
      <p className="font-semibold mb-2">Ksh {price.toFixed(2)}</p>
      <div className="flex gap-2">
        <Link href={`/products/${product.id}`}>
          <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
            View
          </button>
        </Link>
        <AddToCartButton
          product={{
            ...product,
            id: Number(product.id),
            description: product.description ?? "",
            price, // ensure AddToCartButton gets a number
          }}
        />
      </div>
    </div>
  );
}
