import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [] },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const id = product?._id || product?.id;
      const existing = state.cart.find(item => (item?._id || item?.id) === id);
      if (existing) existing.qty = (existing.qty || 1) + (product.qty || 1);
      else state.cart.push({ ...product, qty: product.qty || 1 });
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter(
        item => (item?._id || item?.id) !== action.payload,
      );
    },
  },
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { wishlist: [] },
  reducers: {
    addToWishlist(state, action) {
      const product = action.payload;
      const id = product?._id || product?.id;
      if (!state.wishlist.some(item => (item?._id || item?.id) === id)) {
        state.wishlist.push(product);
      }
    },
    removeFromWishlist(state, action) {
      state.wishlist = state.wishlist.filter(
        item => (item?._id || item?.id) !== action.payload,
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

const store = configureStore({
  reducer: {
    user: (state = { isAuthenticated: false, user: null }) => state,
    seller: (state = { isSeller: false }) => state,
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer,
    product: (state = { allProducts: [] }) => state,
    events: (state = { allEvents: [], isLoading: false }) => state,
  },
});

export default store;
