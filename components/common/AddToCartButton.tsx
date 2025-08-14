// components/common/AddToCartButton.tsx
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "@/store/slices/cartSlice";
import { Product } from "@/types/Product";
import { AppDispatch } from "@/store";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Load guest cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const items: Product[] = JSON.parse(storedCart);
      items.forEach((item) => dispatch(addToCart(item)));
    }
  }, [dispatch]);

  const handleAddToCart = async () => {
    setLoading(true);
    setSuccess(false);

    const token = localStorage.getItem("token");

    try {
      if (token) {
        // Logged-in user: call API
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/items/add/`,
          { product_id: product.id, quantity: 1 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        console.info("Guest user: adding to local cart only");
      }

      // Prepare product object safely
      const cartProduct: Product = {
        ...product,
        id: Number(product.id),
        description: product.description ?? "",
        price: Number(product.price ?? 0),
        sizes: product.sizes ?? [],
        colors: product.colors ?? [],
        seller: product.seller ?? null, // ✅ keep full Seller object or null
      };

      // Update Redux
      dispatch(addToCart(cartProduct));

      // Persist guest cart
      const storedCart = localStorage.getItem("cart");
      const cartItems: Product[] = storedCart ? JSON.parse(storedCart) : [];
      if (!cartItems.some((item) => item.id === cartProduct.id)) {
        cartItems.push(cartProduct);
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }

      setSuccess(true);
    } catch (err: any) {
      console.error("Failed to add to cart:", err);

      if (err.response?.status === 401) {
        alert("You must log in to add this product to your cart.");
      } else {
        alert("Failed to add to cart. Please try again.");
      }
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(false), 1500);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
    >
      {loading ? "Adding..." : success ? "Added!" : "Add to Cart"}
    </button>
  );
}
