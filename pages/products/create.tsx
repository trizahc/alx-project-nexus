// pages/products/create.tsx
import React, { useState } from "react";
import API from "../../utils/api";

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/products/", { name, price });
      alert("Created");
    } catch (err) {
      console.error(err);
      alert("Error");
    }
  };

  return (
    <form onSubmit={submit} style={{ padding: 20 }}>
      <h1>Create Product</h1>
      <div>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Price</label>
        <input value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      </div>
      <button type="submit">Create</button>
    </form>
  );
}
