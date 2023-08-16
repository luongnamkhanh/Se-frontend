import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import saleService from "./saleService";

export const getSalesByCustomer = createAsyncThunk(
  "sale/get-sales-by-customer",
  async (data, thunkAPI) => {
    try {
      return await saleService.getSalesByCustomer(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const getSalesByConfig = createAsyncThunk(
  "sale/get-sales-by-config",
  async (data, thunkAPI) => {
    try {
      return await saleService.getSalesByConfig(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const getSalesByItem = createAsyncThunk(
  "sale/get-sales-by-item",
  async (data, thunkAPI) => {
    try {
      return await saleService.getSalesByItem(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const resetState = createAction("Reset_all");

const initialState = {
  sales: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const saleSlice = createSlice({
  name: "sales",
  initialState: {
    salesByCustomer: {}, // Initial state for salesByCustomer
    salesByConfig: {}, // Initial state for salesByConfig
    salesByItem: {}, // Initial state for salesByItems
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSalesByCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSalesByCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.salesByCustomer = action.payload; // Update salesByCustomer state
      })
      .addCase(getSalesByCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getSalesByConfig.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSalesByConfig.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.salesByConfig = action.payload; // Update salesByConfig state
      })
      .addCase(getSalesByConfig.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getSalesByItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSalesByItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.salesByItem = action.payload;
      })
      .addCase(getSalesByItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      });
  },
});

export default saleSlice.reducer;