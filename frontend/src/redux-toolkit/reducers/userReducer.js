import { createAction, createReducer } from "@reduxjs/toolkit";
import {
  clearErrors,
  deleteAddress,
  loadUser,
  updateAddresses,
  updateUser,
  updateUserAvatar,
  updateUserPassword,
} from "../actions/userActions";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  authChecked: false,
  error: null,
};
export const setUser = createAction("user/setUser");

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload || null;
      state.isAuthenticated = Boolean(action.payload);
      state.loading = false;
    })
    .addCase(loadUser.pending, (state) => {
      state.loading = true;
      state.authChecked = false;
      state.error = null;
    })
    .addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.authChecked = true;
      state.isAuthenticated = Boolean(action.payload);
      state.user = action.payload || null;
    })
    .addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
      state.authChecked = true;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    })
    .addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateUserAvatar.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    .addCase(updateUserAvatar.rejected, (state, action) => {
      state.error = action.payload;
    })
    .addCase(updateUserPassword.rejected, (state, action) => {
      state.error = action.payload;
    })
    .addCase(updateAddresses.pending, (state) => {
      state.addressloading = true;
    })
    .addCase(updateAddresses.fulfilled, (state, action) => {
      state.addressloading = false;
      state.user = action.payload;
    })
    .addCase(updateAddresses.rejected, (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    })
    .addCase(deleteAddress.pending, (state) => {
      state.deletingAddress = true;
    })
    .addCase(deleteAddress.fulfilled, (state, action) => {
      state.deletingAddress = false;
      state.user = action.payload;
    })
    .addCase(deleteAddress.rejected, (state, action) => {
      state.deletingAddress = false;
      state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
      state.error = null;
    });
});
