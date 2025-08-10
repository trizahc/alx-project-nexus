// store/slices/productSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { Product } from "@/types/Product";

interface ProductState {
  products: Product[];
  status: "idle" | "loading" | "failed";
}

const initialState: ProductState = {
  products: [],
  status: "idle",
};

export const fetchProducts = createAsyncThunk<Product[], void>(
  "product/fetchProducts",
  async () => {
    const res = await api.get("/products/");
    // if DRF returns paginated object, adapt:
    if (res.data && Array.isArray(res.data)) return res.data;
    if (res.data?.results) return res.data.results;
    return [];
  }
);

export const fetchProductById = createAsyncThunk<Product, number>(
  "product/fetchProductById",
  async (id) => {
    const res = await api.get(`/products/${id}/`);
    return res.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
