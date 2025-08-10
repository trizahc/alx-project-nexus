// components/common/FilterPanel.tsx
import { useState } from "react";

interface Category {
  id: number;
  name: string;
}

interface Props {
  categories?: Category[];
  selectedCategory?: number | null;
  onCategoryChange?: (categoryId: number | null) => void;
  priceRange?: [number | null, number | null];
  onPriceChange?: (range: [number | null, number | null]) => void;
}

export default function FilterPanel({
  categories = [],
  selectedCategory = null,
  onCategoryChange,
  priceRange = [null, null],
  onPriceChange,
}: Props) {
  const [min, setMin] = useState<number | "">(priceRange[0] ?? "");
  const [max, setMax] = useState<number | "">(priceRange[1] ?? "");

  const applyPrice = () => {
    onPriceChange?.([min === "" ? null : Number(min), max === "" ? null : Number(max)]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-2">Categories</h4>
        <ul className="space-y-1">
          <li
            className={`cursor-pointer ${selectedCategory === null ? "text-green-600 font-bold" : ""}`}
            onClick={() => onCategoryChange?.(null)}
          >
            All
          </li>
          {categories.map((c) => (
            <li
              key={c.id}
              className={`cursor-pointer ${selectedCategory === c.id ? "text-green-600 font-bold" : ""}`}
              onClick={() => onCategoryChange?.(c.id)}
            >
              {c.name}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Price Range</h4>
        <div className="flex gap-2">
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Min"
            className="w-full border p-1 rounded"
          />
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Max"
            className="w-full border p-1 rounded"
          />
        </div>
        <button
          onClick={applyPrice}
          className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
