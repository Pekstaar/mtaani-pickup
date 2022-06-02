import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorageService from '../../services/AsyncStorageService';
import AuthService from '../../services/AuthService';

let user;
const initialState = {
  user: user,
  isError: false,
  isLoading: false,
  isLoadingPage: false,
  isSuccess: false,
  message: '',
};

// register user
export const registerUser = createAsyncThunk(
  'auth/register',
  async (user, thunkApi) => {
    try {
      return await AuthService.registerUser({...user});
    } catch (e) {
      const message =
        e?.response?.data?.error?.message ||
        e?.response?.data?.message ||
        e?.message ||
        e;

      console.log(e.response);

      return thunkApi.rejectWithValue(message);
    }
  },
);
// Login user
export const loginUser = createAsyncThunk(
  'auth/login',
  async (user, thunkApi) => {
    try {
      const res = await AuthService.loginUser(user);

      console.log(res);
      return res;
    } catch (e) {
      const message = e?.response?.data?.message || e?.message || e;

      thunkApi.rejectWithValue(message);
      return;
    }
  },
);

// Login with facebook
export const loginWithFacebook = createAsyncThunk(
  'auth/login_facebook',
  async thunkApi => {
    try {
      const res = await AuthService.facebookLogin();

      console.log(res);
      return res;
    } catch (e) {
      const message = e?.response?.data?.message || e?.message || e;

      thunkApi.rejectWithValue(message);
      return;
    }
  },
);

// Login with google
export const loginWithGoogle = createAsyncThunk(
  'auth/login_google',
  async thunkApi => {
    try {
      const res = await AuthService.googleLogin();

      return res;
    } catch (e) {
      const message = e?.response?.data?.message || e?.message || e;

      thunkApi.rejectWithValue(message);
      return;
    }
  },
);

export const fetchUserFromStorage = createAsyncThunk('auth/fetch', async () => {
  const user = await AsyncStorageService.getData('user');

  return JSON.parse(user);
});

// Verify user
export const verifyUser = createAsyncThunk(
  'auth/verify',
  async (verificationData, thunkApi) => {
    try {
      return await AuthService.activateUser(verificationData);
    } catch (e) {
      const message =
        e?.response?.data?.message || e?.error?.message || e.message || e;

      console.log(e.response);

      return thunkApi.rejectWithValue(message);
    }
  },
);

// logout
export const logout = createAsyncThunk('auth/logout', async () => {
  await AuthService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.isLoadingPage = true;
      state.message = '';
    },
  },
  extraReducers: builder => {
    builder
      // register
      .addCase(registerUser.pending(), state => {
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
      .addCase(logout.fulfilled, state => {
        state.user = null;
      })
      // login
      .addCase(loginUser.pending(), state => {
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
      // facebook login
      .addCase(loginWithFacebook.pending(), state => {
        state.isLoading = true;
      })
      .addCase(loginWithFacebook.fulfilled(), (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.user = action.payload;
        console.log('Facebook login', action?.payload);
      })
      .addCase(loginWithFacebook.rejected(), (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.user = null;
        console.log(action.payload);
      })

      // google login
      .addCase(loginWithGoogle.pending(), state => {
        state.isLoading = true;
      })
      .addCase(loginWithGoogle.fulfilled(), (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.user = action.payload;
        console.log('Facebook login', action?.payload);
      })
      .addCase(loginWithGoogle.rejected(), (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.user = null;
        console.log(action.payload);
      })
      // verify
      .addCase(verifyUser.pending(), state => {
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
        state.isLoadingPage = true;
      })
      .addCase(fetchUserFromStorage.fulfilled(), (state, action) => {
        state.user = action?.payload;
        state.isLoadingPage = false;

        console.log('payload User', action.payload);
      });
  },
});

export const {reset} = authSlice.actions;

export default authSlice.reducer;
