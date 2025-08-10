// components/common/AddToCartButton.tsx
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { Product } from "@/types/Product";
import { AppDispatch } from "@/store";

export default function AddToCartButton({ product }: { product: Product }) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <button
      onClick={() => dispatch(addToCart(product))}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
    >
      Add to Cart
    </button>
  );
}
