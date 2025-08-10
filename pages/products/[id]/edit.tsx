// pages/products/[id]/edit.tsx
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import API from "../../../utils/api";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<any>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");

  useEffect(() => {
    if (!id) return;
    API.get(`/products/${id}/`).then((res) => {
      setProduct(res.data);
      setName(res.data.name);
      setPrice(res.data.price);
    });
  }, [id]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    await API.put(`/products/${id}/`, { name, price });
    alert("Saved");
  };

  if (!product) return <p>Loading...</p>;
  return (
    <form onSubmit={save} style={{ padding: 20 }}>
      <h1>Edit Product</h1>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <input value={price as number | string} onChange={(e) => setPrice(Number(e.target.value))} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}
