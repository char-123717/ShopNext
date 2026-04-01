//This file is your: Redux brain (central configuration)
//combines all features (cart, wishlist)
//defines global state structure
//enables TypeScript safety


//This is a helper from Redux Toolkit to create a store the modern way
//sets up Redux DevTools 
//adds middleware (like thunk) 
//simplifies configuration 
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";
import wishlistReducer from "@/features/wishlist/wishlistSlice";

//Reducer: A function that takes current state + action → returns new state
//combining reducers into one global store:
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

//extracts the type of entire Redux state
export type RootState = ReturnType<typeof store.getState>;
//gets the type of dispatch function
export type AppDispatch = typeof store.dispatch;