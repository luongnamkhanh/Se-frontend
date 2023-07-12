import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartService } from "./cartService";
import { toast } from "react-toastify";

export const addToCart = createAsyncThunk(
  "cart/add",
  async (cartData, thunkAPI) => {
    try {
      return await cartService.addCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeCart = createAsyncThunk(
  "cart/remove",
  async (cartData, thunkAPI) => {
    try {
      return await cartService.removeCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeAllCart = createAsyncThunk(
  "cart/removeAll",
  async (cartData, thunkAPI) => {
    try {
      return await cartService.removeAllCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



const initialState = {
  cart: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  messsage: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addedCart = action.payload;
        if (state.isSuccess === true) {
          toast.success("Product add successfully", { autoClose: 2000 });
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.messsage = action.error;
        if (state.isError === true) {
          toast.error("Error", { autoClose: 2000 });
        }
      })
      .addCase(removeCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.removedCart = action.payload;
        if (state.isSuccess === true) {
          toast.success("Product remove successfully", { autoClose: 2000 });
        }
      }
      )
      .addCase(removeCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.messsage = action.error;
        if (state.isError === true) {
          toast.error("Error", { autoClose: 2000 });
        }
      }
      )
      .addCase(removeAllCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeAllCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.removedAllCart = action.payload;
        if (state.isSuccess === true) {
          toast.success("Product remove successfully", { autoClose: 2000 });
        }
      }
      )
      .addCase(removeAllCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.messsage = action.error;
        if (state.isError === true) {
          toast.error("Error", { autoClose: 2000 });
        }
      }
      )
      ;
  },
});

export default cartSlice.reducer;
