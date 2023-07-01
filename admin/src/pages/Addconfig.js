import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomPriceInput from "../components/CustomPriceInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { createConfigs, resetState } from "../features/config/configSlice";

let schema = yup.object().shape({
  color: yup.string().required("Color is Required"),
  ram: yup.string().required("RAM is Required"),
  rom: yup.string().required("ROM is Required"),
  extraCharge: yup.number().required("Extra Charge is Required"),
  productId: yup.string().required("Product is Required"),
  quantity: yup.number().required("Quantity is Required"),
  image: yup.string().required("Image is Required"),
});

const AddConfig = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.product.products);
  const newConfig = useSelector((state) => state.pconfig);
  const { isSuccess, isError, isLoading, createdConfig } = newConfig;

  useEffect(() => {
    if (isSuccess && createdConfig) {
      toast.success("Config Added Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    initialValues: {
      color: "",
      ram: "",
      rom: "",
      extraCharge: "",
      productId: "",
      quantity: "",
      image: ""
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log('hii')
      dispatch(createConfigs(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Config</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Color"
            name="color"
            onChng={formik.handleChange("color")}
            onBlr={formik.handleBlur("color")}
            val={formik.values.color}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          <CustomInput
            type="text"
            label="Enter Ram"
            name="ram"
            onChng={formik.handleChange("ram")}
            onBlr={formik.handleBlur("ram")}
            val={formik.values.ram}
          />
          <div className="error">
            {formik.touched.ram && formik.errors.ram}
          </div>
          <CustomInput
            type="text"
            label="Enter Rom"
            name="rom"
            onChng={formik.handleChange("rom")}
            onBlr={formik.handleBlur("rom")}
            val={formik.values.rom}
          />
          <div className="error">
            {formik.touched.rom && formik.errors.rom}
          </div>
          <CustomInput
            type="number"
            step="0.01"
            label="Enter Extra Charge"
            name="extraCharge"
            onChng={formik.handleChange("extraCharge")}
            onBlr={formik.handleBlur("extraCharge")}
            val={formik.values.extraCharge}
          />
          <div className="error">
            {formik.touched.extraCharge && formik.errors.extraCharge}
          </div>
          <select
            name="productId"
            onChange={formik.handleChange("productId")}
            onBlur={formik.handleBlur("productId")}
            value={formik.values.productId}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Product</option>
            {productState.products?.map((i, j) => {
              return (
                <option key={j} value={i.product_id}>
                  {i.product_name}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.productId && formik.errors.productId}
          </div>
          <CustomInput
            type="text"
            label="Enter Link Image"
            name="image"
            onChng={formik.handleChange("image")}
            onBlr={formik.handleBlur("image")}
            val={formik.values.image}
          />
          <div className="error">
            {formik.touched.image && formik.errors.image}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Config
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddConfig;
