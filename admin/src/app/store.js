import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import pCategoryReducer from "../features/pcategory/pcategorySlice";
import configReducer from "../features/config/configSlice";
import saleReducer from "../features/sale/saleSlice";
import itemReducer from "../features/item/itemSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    brand: brandReducer,
    pCategory: pCategoryReducer,
    pconfig: configReducer,
    sales: saleReducer,
    items: itemReducer,
  },
});
