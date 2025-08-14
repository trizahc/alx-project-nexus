export interface Category {
  id: number;
  name: string;
}

export interface Seller {
  id: number;
  username: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;          // always a string
  price: number;                // always a number
  stock: number;
  image?: string | null;
  category?: Category | null;   // category object only
  seller?: Seller | null;       // seller object only
  colors: string[];             // default empty array
  sizes: string[];              // default empty array
  shoe_sizes?: string[];        // optional
}
