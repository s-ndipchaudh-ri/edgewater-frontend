import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../axiosInstance";

interface User {
  username: string;
  email: string;
  pairs: string[];
  access_token: string;
}

const token = localStorage.getItem("access_token");
const user = localStorage.getItem("user");

interface UserState {
    user: {
      username: string;
      email: string;
      pairs: string[];
    } | null;
    isLoggedIn: boolean;
    access_token: string | null; // Store the token
    loading: boolean;
    error: string | null;
  }

  const initialState: UserState = {
    user: user ? JSON.parse(user) : null,
    isLoggedIn: !!token,
    access_token: token,
    loading: false,
    error: null,
  };

// Async actions for login and register
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData: { username: string; email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/register", userData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
    "user/login",
    async (credentials: { username: string; password: string }, thunkAPI) => {
      try {
        const response = await axiosInstance.post("/auth/login", credentials);
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
    }
  );

  export const updateUserPairs = createAsyncThunk(
    "user/updatePairs",
    async (pairs: string[], thunkAPI) => {
      try {
        const response = await axiosInstance.patch("/user/pairs", { pairs });
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
    }
  );

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.access_token = null;

        // Clear localStorage

        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.response || action.payload.errorResponse.errmsg || "Something went wrong.";

      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        localStorage.setItem('user',JSON.stringify(action.payload));
        localStorage.setItem('access_token',action.payload.access_token);
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.error = action.payload.response || "Something went wrong.";
      })
      .addCase(updateUserPairs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserPairs.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        if (state.user) {
          state.user.pairs = action.payload.pairs;
        }
      })
      .addCase(updateUserPairs.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
