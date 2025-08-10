// pages/payment/[id].tsx
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";

export default function PaymentPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <p className="p-6 text-center">Loading payment options...</p>;

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow text-center">
      <h1 className="text-2xl font-bold mb-6">Payment for Order #{id}</h1>

      <div className="flex justify-center gap-6">
        <Link href={`/payment/${id}/mpesa`}>
          <button className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Pay with M-Pesa
          </button>
        </Link>

        <Link href={`/payment/${id}/paypal`}>
          <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Pay with PayPal
          </button>
        </Link>
      </div>
    </div>
  );
}
