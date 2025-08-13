// pages/_app.tsx
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store";

import { CartProvider } from "@/components/cart/CartContext";
import { AuthProvider } from "@/hooks/userAuthContext"; // ✅ Ensure exact casing

import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
}
