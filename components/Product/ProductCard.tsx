// components/Product/ProductCard.tsx
import Link from "next/link";
import React from "react";
import AddToCartButton from "../common/AddToCartButton";

export default function ProductCard({ product }: { product: any }) {
  return (
    <div style={{ border: "1px solid #eee", padding: 12 }}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <div style={{ display: "flex", gap: 8 }}>
        <Link href={`/products/${product.id}`}>
          <button>View</button>
        </Link>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
