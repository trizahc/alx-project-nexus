// pages/payment/[id].tsx
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";

export default function PaymentPage() {
  const r = useRouter();
  const { id } = r.query;
  return (
    <div style={{ padding: 20 }}>
      <h1>Payment for Order {id}</h1>
      <div style={{ display: "flex", gap: 12 }}>
        <Link href={`/payment/${id}/mpesa`}><button>Pay with M-Pesa</button></Link>
        <Link href={`/payment/${id}/paypal`}><button>Pay with PayPal</button></Link>
      </div>
    </div>
  );
}
