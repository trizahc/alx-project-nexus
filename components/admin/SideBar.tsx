// components/admin/SideBar.tsx
import Link from "next/link";
import React from "react";

export default function SideBar() {
  return (
    <aside style={{ width: 220, borderRight: "1px solid #eee", padding: 12 }}>
      <h3>Admin</h3>
      <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/orders">Orders</Link>
        <Link href="/admin/products">Products</Link>
        <Link href="/admin/users">Users</Link>
        <Link href="/admin/stores">Stores</Link>
      </nav>
    </aside>
  );
}
