// components/filters/CategoryFilterDrawer.tsx
import React, { useEffect, useState } from "react";
import API from "../../utils/api";

export default function CategoryFilterDrawer({ onSelect }: { onSelect?: (c: any) => void }) {
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    API.get("/categories/").then((r) => setCategories(r.data || [])).catch(() => {});
  }, []);
  return (
    <aside style={{ width: 220, padding: 12 }}>
      <h4>Categories</h4>
      <ul>
        {categories.map((c) => (
          <li key={c.id}><button onClick={() => onSelect && onSelect(c)}>{c.name}</button></li>
        ))}
      </ul>
    </aside>
  );
}
