import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorageService from '../../services/AsyncStorageService';
import AuthService from '../../services/AuthService';

const initialState = {
  // user: null,
  user: null,
  isError: false,
  isLoading: false,
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
      const message = JSON.stringify(e?.response?.data);

      console.log(e);

      return thunkApi.rejectWithValue(message);
    }
  },
);

export const fetchUserFromStorage = createAsyncThunk('auth/fetch', async () => {
  const user = await AsyncStorageService.getData('user');

  return JSON.parse(user);
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: builder => {
    builder
      // register
      .addCase(registerUser.pending(), state => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(registerUser.fulfilled(), (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload?.saved;
        state.isError = false;
        state.message = '';
      })
      .addCase(registerUser.rejected(), (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.isSuccess = false;
      });
  },
});

export const {reset} = authSlice.actions;

export default authSlice.reducer;
