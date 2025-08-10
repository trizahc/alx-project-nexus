import { Product } from "@/store/productSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();

  // Ensure full image URL (DRF relative paths)
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${process.env.NEXT_PUBLIC_API_URL}${product.image}`
    : "/images/placeholder.png";

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col hover:shadow-lg transition">
      {/* Product Image */}
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={product.name || "Product"}
          fill
          className="object-cover rounded"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/placeholder.png";
          }}
        />
      </div>

      {/* Product Info */}
      <div className="mt-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold line-clamp-1">
          {product.name || "Unnamed Product"}
        </h3>
        <p className="text-green-600 font-bold mb-1">
          Ksh {Number(product.price).toFixed(2)}
        </p>
        <p className="text-sm text-gray-500">
          {typeof product.category === "string"
            ? product.category
            : product.category?.name || "Uncategorized"}
        </p>

        {/* Optional Attributes */}
        {product.colors?.length > 0 && (
          <p className="text-xs text-gray-600 mt-1">
            Colors: {product.colors.join(", ")}
          </p>
        )}
        {product.sizes?.length > 0 && (
          <p className="text-xs text-gray-600">Sizes: {product.sizes.join(", ")}</p>
        )}
        {product.shoe_sizes?.length > 0 && (
          <p className="text-xs text-gray-600">
            Shoe Sizes: {product.shoe_sizes.join(", ")}
          </p>
        )}

        {/* Action Buttons */}
        <div className="mt-auto flex gap-2">
          <button
            onClick={() => dispatch(addToCart(product))}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Add to Cart
          </button>
          <Link
            href={`/product/${product.id}`}
            className="flex-1 text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
