import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USER_API = `${API_BASE_URL}/api/v2/user`;

export const clearErrors = createAction("user/clearErrors");

const apiError = (error, fallback) =>
  error.response?.data?.message || error.message || fallback;

export const loadUser = createAsyncThunk(
  "user/load",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${USER_API}/get-user`, {
        withCredentials: true,
      });
      return data.user;
    } catch (error) {
      return rejectWithValue(apiError(error, "Failed to load user"));
    }
  },
);

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ email, password, fullName, phoneNumber }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${USER_API}/update-user-info`,
        { email, password, fullName, phoneNumber },
        { withCredentials: true },
      );
      if (!data.success)
        return rejectWithValue(data.message || "Failed to update user");
      toast.success("Profile updated successfully!");
      return data.user;
    } catch (error) {
      return rejectWithValue(apiError(error, "Failed to update user"));
    }
  },
);

export const updateUserPassword = createAsyncThunk(
  "user/updatePassword",
  async (passwordInfo, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${USER_API}/update-user-password`,
        passwordInfo,
        { withCredentials: true },
      );
      if (!data.success)
        return rejectWithValue(data.message || "Failed to update password");
      toast.success(data.message || "Password updated successfully!");
      return data;
    } catch (error) {
      return rejectWithValue(apiError(error, "Failed to update password"));
    }
  },
);

export const updateUserAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      // Backend multer middleware is configured for upload.single("file").
      formData.append("file", file);
      const { data } = await axios.put(
        `${USER_API}/update-user-avatar`,
        formData,
        { withCredentials: true },
      );
      if (!data.success)
        return rejectWithValue(data.message || "Failed to update avatar");
      toast.success("Profile photo updated!");
      return data.user;
    } catch (error) {
      return rejectWithValue(apiError(error, "Failed to update avatar"));
    }
  },
);
