// pages/_app.tsx
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store";

import { CartProvider } from "@/components/cart/CartContext";  // your CartProvider
import { AuthProvider } from "@/hooks/userAuthContext";     // import AuthProvider
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
