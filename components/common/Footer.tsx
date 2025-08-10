// components/common/Footer.tsx
import React from "react";

export default function Footer() {
  return (
    <footer style={{ padding: 20, textAlign: "center", borderTop: "1px solid #eee", marginTop: 40 }}>
      <small>© {new Date().getFullYear()} ShopX</small>
    </footer>
  );
}
