import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomPriceInput from "../components/CustomPriceInput";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";
let schema = yup.object().shape({
  productName: yup.string().required("Title is Required"),
  brandId: yup.string().required("Brand is Required"),
  categoryId: yup.string().required("Category is Required"),
  modelYear: yup.number().required("Model Year is Required"),
  listPrice: yup.number().required("Price is Required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  console.log(brandState.brands)
  const catState = useSelector((state) => state.pCategory.pCategories);
  console.log(catState.categorys)
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    initialValues: {
      productName: "",
      brandId: "",
      categoryId: "",
      listPrice: "",
      modelYear: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log('Submitting')
      // console.log(values);  
      dispatch(createProducts(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
    
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="productName"
            onChng={formik.handleChange("productName")}
            onBlr={formik.handleBlur("productName")}
            val={formik.values.productName}
          />
          <div className="error">
            {formik.touched.productName && formik.errors.productName}
          </div>
          
          <select
            name="brandId"
            onChange={formik.handleChange("brandId")}
            onBlur={formik.handleBlur("brandId")}
            value={formik.values.brandId}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Brand</option>
            {brandState.brands?.map((i, j) => {
              return (
                <option key={j} value={i.brand_id}>
                  {i.brand_name}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brandId && formik.errors.brandId}
          </div>
          <select
            name="categoryId"
            onChange={formik.handleChange("categoryId")}
            onBlur={formik.handleBlur("categoryId")}
            value={formik.values.categoryId}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Category</option>
            {catState.categorys?.map((i, j) => {
              return (
                <option key={j} value={i.category_id}>
                  {i.category_name}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.categoryId && formik.errors.categoryId}
          </div>
          <CustomInput
            type="text"
            label="Enter Model Year"
            name="modelYear"
            onChng={formik.handleChange("modelYear")}
            onBlr={formik.handleBlur("modelYear")}
            val={formik.values.modelYear}
          />
          <div className="error">
            {formik.touched.modelYear && formik.errors.modelYear}
          </div>
          <CustomPriceInput
            type="number"
            step="0.01"
            label="Enter Product Price"
            name="listPrice"
            onChng={formik.handleChange("listPrice")}
            onBlr={formik.handleBlur("listPrice")}
            val={formik.values.listPrice}
          />
          <div className="error">
            {formik.touched.listPrice && formik.errors.listPrice}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
