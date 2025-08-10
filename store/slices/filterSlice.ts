// store/slices/filterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  category: string; // category name or "All"
  searchTerm: string;
  sortOrder: "asc" | "desc";
  priceRange: [number | null, number | null];
}

const initialState: FilterState = {
  category: "All",
  searchTerm: "",
  sortOrder: "asc",
  priceRange: [null, null],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setSortOrder(state, action: PayloadAction<"asc" | "desc">) {
      state.sortOrder = action.payload;
    },
    setPriceRange(state, action: PayloadAction<[number | null, number | null]>) {
      state.priceRange = action.payload;
    },
    resetFilters(state) {
      state.category = "All";
      state.searchTerm = "";
      state.sortOrder = "asc";
      state.priceRange = [null, null];
    },
  },
});

export const { setCategory, setSearchTerm, setSortOrder, setPriceRange, resetFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
