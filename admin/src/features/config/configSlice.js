import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import configService from "./configService";

export const getConfigs = createAsyncThunk(
  "config/get-configs",
  async (thunkAPI) => {
    try {
      const res =  await configService.getConfigs();
    //   console.log(res)
      return res
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createConfigs = createAsyncThunk(
  "config/create-configs",
  async (configData, thunkAPI) => {
    try {
      return await configService.createConfig(configData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAConfig = createAsyncThunk(
  "config/get-config",
  async (id, thunkAPI) => {
    try {
      return await configService.getConfig(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAConfig = createAsyncThunk(
  "config/delete-config",
  async (id, thunkAPI) => {
    try {
      return await configService.deleteConfig(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  configs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const configSlice = createSlice({
  name: "configs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConfigs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getConfigs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.configs = action.payload;
      })
      .addCase(getConfigs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createConfigs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createConfigs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdConfig = action.payload;
      })
      .addCase(createConfigs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAConfig.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAConfig.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.configName = action.payload;
      })
      .addCase(getAConfig.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAConfig.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAConfig.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedConfig = action.payload;
      })
      .addCase(deleteAConfig.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default configSlice.reducer;
