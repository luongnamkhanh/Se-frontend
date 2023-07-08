import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/user/userSlice";
// import customerReducer from "../features/cutomers/customerSlice";
import productReducer from "../features/product/productSlice";
import ratingReducer from "../features/rating/ratingSlice";
import cartReducer from "../features/cart/cartSlice";
// import brandReducer from "../features/brand/brandSlice";
// import pCategoryReducer from "../features/pcategory/pcategorySlice";
// import bCategoryReducer from "../features/bcategory/bcategorySlice";
// import blogReducer from "../features/blogs/blogSlice";
// import colorReducer from "../features/color/colorSlice";
// import enquiryReducer from "../features/enquiry/enquirySlice";
// import uploadReducer from "../features/upload/uploadSlice";
// import couponReducer from "../features/coupon/couponSlice";
// import configReducer from "../features/config/configSlice";
// import saleReducer from "../features/sale/saleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // customer: customerReducer,
    product: productReducer,
    rating: ratingReducer,
    cart: cartReducer,
    // brand: brandReducer,
    // pCategory: pCategoryReducer,
    // bCategory: bCategoryReducer,
    // blogs: blogReducer,
    // pconfig: configReducer, 
    // color: colorReducer,
    // enquiry: enquiryReducer,
    // upload: uploadReducer,
    // coupon: couponReducer,
    // sales: saleReducer,
  },
});

