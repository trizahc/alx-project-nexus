// pages/products/[id].tsx
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import AddToCartButton from "../../components/common/AddToCartButton";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    API.get(`/products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <AddToCartButton product={product} />
    </div>
  );
}
