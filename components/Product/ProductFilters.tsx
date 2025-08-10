// components/Product/ProductFilters.tsx
import React from "react";

export default function ProductFilters() {
  return (
    <aside style={{ width: 220, padding: 12 }}>
      <h4>Filters</h4>
      <div>
        <label>Search</label>
        <input />
      </div>
      <div>
        <label>Min price</label>
        <input />
      </div>
    </aside>
  );
}
