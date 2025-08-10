// components/common/DeleteCartItemButton.tsx
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/store/slices/cartSlice";
import { AppDispatch } from "@/store";

export default function DeleteCartItemButton({ productId }: { productId: number }) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <button
      onClick={() => dispatch(removeFromCart(productId))}
      className="text-red-600 hover:underline text-sm"
    >
      Remove
    </button>
  );
}
