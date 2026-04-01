//// Import helper to create slice + type for action payload
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

// Define the shape of wishlist state
interface WishlistState {
  items: Product[];
}

// Initial state → empty wishlist
const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist", // Name of slice (used in Redux DevTools & action types)
  initialState, // Initial state defined above
  reducers: {
    // Action receives a Product as payload
    //PayloadAction<Product> → ensures correct data type
    toggleWishlist(state, action: PayloadAction<Product>) {

        // Check if product already exists in wishlist
      const exists = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (exists) {
        // If product already in wishlist → REMOVE it
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        // If product not in wishlist → ADD it
        state.items.push(action.payload);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;