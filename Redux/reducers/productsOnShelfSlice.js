import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AboutBusinessService from '../../services/AboutBusinessService';
// import AsyncStorageService from '../../services/AsyncStorageService';
// import AuthService from '../../services/AuthService';

const initialState = {
  products: [],
  selectedProduct: null,
  isError: false,
  isLoading: false,
  isLoadingPage: false,
  isSuccess: false,
  message: '',
};

export const fetchProductsOnShelf = createAsyncThunk(
  'shelf/fetch_products',
  async (id, thunkApi) => {
    try {
      return await AboutBusinessService.fetchProducts(id);
    } catch (e) {
      const message =
        e?.response?.data?.error?.message ||
        e?.response?.data?.message ||
        e?.message ||
        e;

      console.log(e);

      return thunkApi.rejectWithValue(message);
    }
  },
);

export const productsOnShelfSlice = createSlice({
  name: 'shelf',
  initialState,
  reducers: {
    reset: state => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.isLoadingPage = true;
      state.message = '';
    },

    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchProductsOnShelf.pending(), state => {
        state.isLoading = true;
      })
      .addCase(fetchProductsOnShelf.fulfilled(), (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(fetchProductsOnShelf.rejected(), (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.products = [];
      });
  },
});

export const {reset, setSelectedProduct} = productsOnShelfSlice.actions;
export default productsOnShelfSlice.reducer;
