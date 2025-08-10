// pages/payment/[id]/mpesa.tsx
import { useRouter } from "next/router";
import React from "react";
import API from "../../../utils/api";

export default function Mpesa() {
  const r = useRouter();
  const { id } = r.query;

  const pay = async () => {
    try {
      await API.post(`/payments/${id}/mpesa/`);
      alert("Payment requested. Check your phone.");
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>M-Pesa Payment</h1>
      <button onClick={pay}>Request STK Push</button>
    </div>
  );
}
