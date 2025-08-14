// store/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/Product";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

// Load initial cart from localStorage
const loadCart = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("cart");
    if (stored) return JSON.parse(stored);
  }
  return [];
};

const initialState: CartState = {
  items: loadCart(),
};

const saveCart = (items: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(items));
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCart(state.items); // persist
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCart(state.items); // persist
    },
    clearCart: (state) => {
      state.items = [];
      saveCart(state.items); // persist
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
