import PLTApiService, { ApiResponse } from '@/services/service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  colour: string;
  name: string;
  price: number;
  img: string;
}

export interface ProductState {
  data: ApiResponse<Product[]>;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  data: { data: [] },
  isLoading: false,
  error: null,
};

const fetchProducts = createAsyncThunk<ApiResponse<Product[]>, void>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const apiService = PLTApiService.getInstance();
      const response = await apiService.get<Product[]>(
        '/benirvingplt/products/products',
      );
      return response; // Return the entire response
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default productSlice.reducer;
export { fetchProducts };
