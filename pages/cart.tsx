import { useCart } from "@/components/cart/CartContext";
import Link from "next/link";
import Image from "next/image";

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // Ensure cartItems is typed as CartItem[]
  const typedCartItems: CartItem[] = cartItems ?? [];

  // Calculate total price with types
  const totalPrice = typedCartItems.reduce((total: number, item: CartItem) => {
    return total + item.price * item.quantity;
  }, 0);

  if (typedCartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Link href="/shop" className="text-blue-600 hover:underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

      <div className="space-y-6">
        {typedCartItems.map((item: CartItem) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4"
          >
            <Image
              src={item.image || "/default-product.png"}
              alt={item.name}
              width={100}
              height={100}
              className="object-contain"
            />

            <div className="flex-1">
              <h2 className="text-lg font-medium">{item.name}</h2>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center space-x-2">
              <label htmlFor={`qty-${item.id}`} className="sr-only">
                Quantity
              </label>
              <input
                id={`qty-${item.id}`}
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, Math.max(1, Number(e.target.value)))
                }
                className="w-16 border rounded px-2 py-1 text-center"
              />
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:underline"
              aria-label={`Remove ${item.name} from cart`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-xl font-semibold">
          Total: ${totalPrice.toFixed(2)}
        </p>
        <button
          onClick={() => alert("Checkout feature coming soon!")}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
