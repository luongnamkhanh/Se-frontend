import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import itemService from "./itemService";
import { toast } from "react-toastify";

export const getItems = createAsyncThunk("item/get-items", async (thunkAPI) => {
  try {
    return await itemService.getItems();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createItem = createAsyncThunk(
  "item/create-item",
  async (data, thunkAPI) => {
    try {
      return await itemService.createItem(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteItem = createAsyncThunk(
  "item/delete-item",
  async (id, thunkAPI) => {
    try {
      return await itemService.deleteItem(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const resetState = createAction("Reset_all");

const initialState = {
  items: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.item = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdItem = action.payload;
        toast.success("Item Added Successfully!", { autoClose: 1500 });
      })
      .addCase(createItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error("Something Went Wrong!", { autoClose: 1500 });
      })
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.item = action.payload;
        toast.success("Delete item successfully", { autoClose: 1000 });
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default itemSlice.reducer;
