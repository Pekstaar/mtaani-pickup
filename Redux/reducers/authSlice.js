import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorageService from "../../services/AsyncStorageService";
import AuthService from "../../services/AuthService";

const initialState = {
  user: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// register user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkApi) => {
    try {
      return await AuthService.registerUser({ ...user });
    } catch (e) {
      const message =
        e?.response?.data?.error?.message ||
        e?.response?.data?.message ||
        e?.message ||
        e;

      console.log(e.response);

      return thunkApi.rejectWithValue(message);
    }
  }
);
// Login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, thunkApi) => {
    try {
      const res = await AuthService.loginUser(user);

      await AsyncStorageService.setData(JSON.stringify(res));

      return await AuthService.loginUser(user);
    } catch (e) {
      const message = e?.response?.data?.message || e?.message || e;

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const fetchUserFromStorage = createAsyncThunk("auth/fetch", async () => {
  const user = await AsyncStorageService.getData("user");

  return JSON.parse(user);
});

// Verify user
export const verifyUser = createAsyncThunk(
  "auth/verify",
  async (verificationData, thunkApi) => {
    try {
      return await AuthService.activateUser(verificationData);
    } catch (e) {
      const message =
        e?.response?.data?.message || e?.error?.message || e.message || e;

      return thunkApi.rejectWithValue(message);
    }
  }
);

// logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending(), (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled(), (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload?.saved;
      })
      .addCase(registerUser.rejected(), (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      // login
      .addCase(loginUser.pending(), (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled(), (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected(), (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        console.log(action.payload);
      })
      // verify
      .addCase(verifyUser.pending(), (state) => {
        state.isLoading = true;
      })
      .addCase(verifyUser.fulfilled(), (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action?.payload?.message;
      })
      .addCase(verifyUser.rejected(), (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchUserFromStorage.pending(), (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUserFromStorage.fulfilled(), (state, action) => {
        state.user = action?.payload;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
