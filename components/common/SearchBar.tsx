// components/common/SearchBar.tsx
import { useState, useEffect } from "react";

interface Props {
  value?: string;
  onSearchChange?: (term: string) => void;
  onSearchSubmit?: (term: string) => void;
}

export default function SearchBar({ value = "", onSearchChange, onSearchSubmit }: Props) {
  const [q, setQ] = useState(value);

  useEffect(() => {
    setQ(value);
  }, [value]);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onSearchSubmit?.(q);
    onSearchChange?.(q);
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products..."
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-400"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Search
      </button>
    </form>
  );
}
