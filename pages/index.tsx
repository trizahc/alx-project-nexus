// pages/index.tsx
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="py-16 text-center bg-green-300">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to ShopX</h1>
        <p className="mt-4 text-lg text-black-600">
          Fast, simple ecommerce built for speed — finish your project faster!
        </p>
        <div className="mt-6">
          <Link href="/products">
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Browse Products
            </button>
          </Link>
        </div>
      </section>

      {/* Featured Section */}
      <section className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Featured</h2>
        <p className="mt-2 text-gray-600">
          Placeholder for featured products / categories
        </p>
      </section>
    </main>
  );
}
