// components/admin/AdminLayout.tsx
import React from "react";
import SideBar from "./SideBar";
// Make sure the file exists as 'TopNav.tsx' or 'TopNav/index.tsx' in the same directory.
// If the file is named differently (e.g., 'topnav.tsx'), update the import accordingly.
import TopNav from "./TopNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SideBar />
      <div style={{ flex: 1 }}>
        <TopNav />
        <main style={{ padding: 20 }}>{children}</main>
      </div>
    </div>
  );
}
