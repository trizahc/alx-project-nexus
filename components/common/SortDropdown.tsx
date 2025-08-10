// components/common/SortDropdown.tsx
interface Props {
  sortOrder: "asc" | "desc";
  onChange: (order: "asc" | "desc") => void;
}

export default function SortDropdown({ sortOrder, onChange }: Props) {
  return (
    <div>
      <label className="mr-2 font-medium text-gray-700">Sort by Price:</label>
      <select
        value={sortOrder}
        onChange={(e) => onChange(e.target.value as "asc" | "desc")}
        className="border border-green-500 text-green-600 px-3 py-1 rounded"
      >
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </div>
  );
}
