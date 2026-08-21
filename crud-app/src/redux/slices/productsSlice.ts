import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Routing now owns "which screen" and "which id is being edited" — those
// used to live here. All that's left is genuinely cross-component UI state:
// the current search term.
interface ProductsUIState {
  searchTerm: string;
}

const initialState: ProductsUIState = {
  searchTerm: "",
};

const productsSlice = createSlice({
  name: "productsUI",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = productsSlice.actions;
export default productsSlice.reducer;

export const selectSearchTerm = (state: RootState) =>
  state.productsUI.searchTerm;
