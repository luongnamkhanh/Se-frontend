import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/user/userSlice'

export const Store = configureStore({
  reducer: {
    auth: authReducer
  }
})