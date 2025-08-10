import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import API from "@/utils/api";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    API.get(`/products/${id}/`)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setPrice(res.data.price.toString());
      })
      .catch(() => setError("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await API.put(`/products/${id}/`, {
        title,
        description,
        price: parseFloat(price),
      });
      router.push(`/products/${id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to save changes");
    }
    setSaving(false);
  };

  if (loading) return <p className="text-center mt-6">Loading product details...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Product</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price (USD)</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className={`w-full py-2 rounded text-white font-semibold ${
            saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } transition`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
