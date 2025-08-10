// pages/_app.tsx
import "@/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import Layout from "../components/common/Layout";
import { CartProvider } from "../components/cart/CartContext";
//import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

