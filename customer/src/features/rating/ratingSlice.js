import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import ratingService from "./ratingService";

export const getRatings = createAsyncThunk(
    "rating/get-ratings",
    async (id, thunkAPI) => {
        try {
            return await ratingService.getRatings(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const resetState = createAction("Reset_all");

const initialState = {
    ratings: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const ratingSlice = createSlice({
    name: "ratings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRatings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRatings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.ratings = action.payload;
            })
            .addCase(getRatings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default ratingSlice.reducer;