// components/ProductGridWithSidebar.tsx
import { useEffect, useMemo, useState } from "react";
import ProductCard from "./common/ProductCard";
import FilterPanel from "./common/FilterPanel";
import SortDropdown from "./common/SortDropdown";
import SearchBar from "./common/SearchBar";
import { Product } from "@/types/Product";
import api from "@/lib/api";
import Spinner from "./common/Spinner";

export default function ProductGridWithSidebar() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [priceRange, setPriceRange] = useState<[number | null, number | null]>([null, null]);

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [pRes, cRes] = await Promise.all([api.get("/products/"), api.get("/categories/")]);
        // adapt to paginated responses
        const pData = Array.isArray(pRes.data) ? pRes.data : pRes.data?.results ?? [];
        setProducts(pData);
        const cData = Array.isArray(cRes.data) ? cRes.data : cRes.data?.results ?? [];
        setCategories(cData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    let list = products.slice();

    // category filter (category might be object)
    if (categoryId !== null) {
      list = list.filter((p) => {
        const cat = p.category;
        if (!cat) return false;
        if (typeof cat === "string") return false;
        return Number(cat.id) === Number(categoryId);
      });
    }

    // search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => (p.name || "").toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q));
    }

    // price range
    const [min, max] = priceRange;
    list = list.filter((p) => {
      const price = Number(p.price || 0);
      if (min !== null && price < min) return false;
      if (max !== null && price > max) return false;
      return true;
    });

    // sort
    list.sort((a, b) => (sortOrder === "asc" ? Number(a.price) - Number(b.price) : Number(b.price) - Number(a.price)));

    return list;
  }, [products, categoryId, search, priceRange, sortOrder]);

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white p-4 rounded-lg shadow-md sticky top-4">
          <SearchBar value={search} onSearchChange={setSearch} onSearchSubmit={setSearch} />
          <div className="mt-4">
            <FilterPanel
              categories={categories}
              selectedCategory={categoryId}
              onCategoryChange={(id) => setCategoryId(id)}
              priceRange={priceRange}
              onPriceChange={(r) => setPriceRange(r)}
            />
          </div>
        </div>
      </aside>

      <main className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
          <h2 className="text-2xl font-bold">Products</h2>
          <SortDropdown sortOrder={sortOrder} onChange={setSortOrder} />
        </div>

        {filtered.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}