// store/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/Product";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const payload = action.payload;
      const existing = state.items.find((i) => i.id === payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...payload, quantity: 1 } as CartItem);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    setQuantity: (state, action: PayloadAction<{ id: number; qty: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.quantity = action.payload.qty;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setQuantity } = cartSlice.actions;
export default cartSlice.reducer;
