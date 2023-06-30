import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createBrand,
  getABrand,
  resetState,
  updateABrand,
} from "../features/brand/brandSlice";
import {
  updateOrderStatus
}
  from "../features/auth/authSlice";

let schema = yup.object().shape({
  shippingDate: yup.string().required("Shipping date is Required"),
});
const UpdateOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getOrderId = location.pathname.split("/")[3];
  console.log(getOrderId);
  const userString = localStorage.getItem("user");
  const userObject = JSON.parse(userString);
  const staffId = userObject.staff.staff_id;

  console.log(staffId);
  // const newBrand = useSelector((state) => state.brand);
  // const {
  //   isSuccess,
  //   isError,
  //   isLoading,
  //   createdBrand,
  //   shippingDate,
  //   updatedBrand,
  // } = newBrand;
  // useEffect(() => {
  //   if (getOrderId !== undefined) {
  //     dispatch(getABrand(getOrderId));
  //   } else {
  //     dispatch(resetState());
  //   }
  // }, [getOrderId]);



  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      shippingDate: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      if (getOrderId !== undefined) {
        const data = {
          id: getOrderId, orderData: {
            ...values,
            staffId: staffId // Replace staffId with the actual staff ID value
          }
        };
        console.log(data);
        dispatch(updateOrderStatus(data));
        // dispatch(resetState());
      }
    },
  });
  useEffect(() => {
    if (formik.submitCount > 0) {
      if (formik.isValid && !formik.isSubmitting) {
        toast.success("Order Updated Successfully!");
        navigate("/admin/orders");
      } else if (!formik.isValid && !formik.isSubmitting) {
        toast.error("Please fix the errors and try again!");
      }
    }
  }, [formik.submitCount, formik.isValid, formik.isSubmitting, navigate]);

  return (
    <div>
      <h3 className="mb-4 title">
        Edit Order
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="shippingDate"
            onChng={formik.handleChange("shippingDate")}
            onBlr={formik.handleBlur("shippingDate")}
            val={formik.values.shippingDate}
            label="Enter Shipping Date"
            id="shippingDate"
          />
          <div className="error">
            {formik.touched.shippingDate && formik.errors.shippingDate}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Update Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateOrder;
