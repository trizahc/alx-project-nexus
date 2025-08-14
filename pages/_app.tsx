// pages/_app.tsx
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store";

import { CartProvider } from "@/components/cart/CartContext";
import { AuthProvider } from "@/hooks/userAuthContext";
import Header from "@/components/common/Header";

import "@/styles/globals.css";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  // ✅ Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("ServiceWorker registered:", registration);
          })
          .catch((err) => {
            console.error("ServiceWorker registration failed:", err);
          });
      });
    }
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            {/* ✅ Global Header */}
            <Header />

            {/* ✅ Main content area */}
            <main className="flex-1">
              <Component {...pageProps} />
            </main>
          </div>
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
}
