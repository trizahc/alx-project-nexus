// pages/index.tsx
import Layout from "@/components/common/Layout";
import ProductGridWithSidebar from "@/components/ProductGridWithSidebar";

export default function HomePage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-green-100 text-gray-800 px-6 py-12 rounded-lg shadow">
          <h1 className="text-3xl sm:text-4xl font-bold">Welcome to NexusStore</h1>
          <p className="mt-2 text-gray-700">Your one-stop shop for electronics, fashion, and accessories.</p>
        </div>

        <ProductGridWithSidebar />
      </div>
    </Layout>
  );
}