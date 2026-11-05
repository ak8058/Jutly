import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: (state = { isSeller: false }) => state,
    cart: (state = { cart: [] }) => state,
    wishlist: (state = { wishlist: [] }) => state,
    product: (state = { allProducts: [] }) => state,
    events: (state = { allEvents: [], isLoading: false }) => state,
  },
});

export default store;
