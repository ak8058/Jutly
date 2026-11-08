import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { sellerReducer } from "./reducers/sellerReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    cart: (state = { cart: [] }) => state,
    wishlist: (state = { wishlist: [] }) => state,
    product: (state = { allProducts: [] }) => state,
    events: (state = { allEvents: [], isLoading: false }) => state,
  },
});

export default store;
