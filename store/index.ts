// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import filterReducer from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
