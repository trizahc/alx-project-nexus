// pages/payment/[id]/paypal.tsx
import { useRouter } from "next/router";
import React from "react";
import API from "../../../utils/api";

export default function Paypal() {
  const r = useRouter();
  const { id } = r.query;

  const start = async () => {
    try {
      const res = await API.post(`/payments/${id}/paypal/`);
      // redirect to paypal url returned by API (example)
      if (res.data && res.data.approvalUrl) window.location.href = res.data.approvalUrl;
    } catch (err) {
      console.error(err);
      alert("Paypal setup failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>PayPal</h1>
      <button onClick={start}>Pay with PayPal</button>
    </div>
  );
}
