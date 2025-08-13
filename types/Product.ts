export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string | null;
  price: number | string;
  stock: number;
  image?: string | null;
  category?: Category | null; // Only Category, remove string
  seller?: number | string;
  colors?: string[] | null;
  sizes?: string[] | null;
  shoe_sizes?: string[] | null;
}
