// components/Product/ProductSlice.ts
// A small utility to store client-side product state (simple substitute for Redux)
import { useState } from "react";

export function useProductSlice() {
  const [query, setQuery] = useState({});
  return { query, setQuery };
}
