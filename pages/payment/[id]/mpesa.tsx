// pages/payment/[id]/mpesa.tsx
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import API from "../../../utils/api";

export default function Mpesa() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Optionally: redirect or notify if no id present after router ready
  useEffect(() => {
    if (!id) {
      setError("No payment ID specified.");
    }
  }, [id]);

  const pay = async () => {
    if (!id) return;
    setLoading(true);
    setError("");
    try {
      await API.post(`/payments/${id}/mpesa/`);
      alert("Payment requested. Check your phone for the STK push.");
    } catch (err) {
      console.error(err);
      setError("Payment failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">M-Pesa Payment</h1>

      {error && (
        <div className="mb-4 text-red-600 font-semibold text-center">{error}</div>
      )}

      <button
        onClick={pay}
        disabled={loading || !id}
        className={`w-full py-3 rounded text-white font-semibold transition-colors duration-200 ${
          loading || !id ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Requesting Payment..." : "Request STK Push"}
      </button>
    </div>
  );
}
