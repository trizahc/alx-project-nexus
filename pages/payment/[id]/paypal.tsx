// pages/payment/[id]/paypal.tsx
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import API from "../../../utils/api";

export default function Paypal() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("No payment ID specified.");
    }
  }, [id]);

  const start = async () => {
    if (!id) return;
    setLoading(true);
    setError("");
    try {
      const res = await API.post(`/payments/${id}/paypal/`);
      if (res.data && res.data.approvalUrl) {
        window.location.href = res.data.approvalUrl;
      } else {
        setError("No approval URL returned from server.");
      }
    } catch (err) {
      console.error(err);
      setError("PayPal setup failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">PayPal Payment</h1>

      {error && (
        <div className="mb-4 text-red-600 font-semibold text-center">{error}</div>
      )}

      <button
        onClick={start}
        disabled={loading || !id}
        className={`w-full py-3 rounded text-white font-semibold transition-colors duration-200 ${
          loading || !id ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Redirecting to PayPal..." : "Pay with PayPal"}
      </button>
    </div>
  );
}
