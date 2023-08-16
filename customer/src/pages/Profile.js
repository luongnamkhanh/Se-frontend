import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { getUserProfile, updateUserProfile } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router";

const profileSchema = yup.object({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is required"),
  phone: yup.string().required("Phone Phone is required"),
  password: yup.string().required("Password is required"),
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
});

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);
  const userState = useSelector((state) => state.auth.userProfile);
  console.log(userState);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: userState?.[0]?.first_name || "",
      last_name: userState?.[0]?.last_name || "",
      email: userState?.[0]?.email || "",
      password: userState?.[0]?.password || "",
      phone: userState?.[0]?.phone || "",
      street: userState?.[0]?.street || "",
      city: userState?.[0]?.city || "",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateUserProfile(values))
      navigate('/')
    },
  });

  return (
    <>
      <BreadCrumb title="Profile" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <form
              className="d-flex flex-column gap-15"
              onSubmit={formik.handleSubmit}
            >
              <label htmlFor="" style={{ color: "#03b1fc" }}>
                First Name
              </label>
              <CustomInput
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formik.values.first_name}
                onChange={formik.handleChange("first_name")}
                onBlur={formik.handleBlur("first_name")}
              />
              <div className="error">
                {formik.touched.first_name && formik.errors.first_name}
              </div>
              <label htmlFor="" style={{ color: "#03b1fc" }}>
                Last Name
              </label>
              <CustomInput
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formik.values.last_name}
                onChange={formik.handleChange("last_name")}
                onBlur={formik.handleBlur("last_name")}
              />
              <div className="error">
                {formik.touched.last_name && formik.errors.last_name}
              </div>
              <label htmlFor="" style={{ color: "#03b1fc" }}>
                Email
              </label>
              <CustomInput
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
              />
              <div className="error">
                {formik.touched.email && formik.errors.email}
              </div>
              <label htmlFor="" style={{ color: "#03b1fc" }}>
                Phone number
              </label>
              <CustomInput
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formik.values.phone}
                onChange={formik.handleChange("phone")}
                onBlur={formik.handleBlur("phone")}
              />
              <div className="error">
                {formik.touched.phone && formik.errors.phone}
              </div>
              <CustomInput
                type="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
              />
              <div className="error">
                {formik.touched.password && formik.errors.password}
              </div>
              <label htmlFor="" style={{ color: "#03b1fc" }}>
                Street
              </label>
              <CustomInput
                type="text"
                name="street"
                placeholder="Street"
                value={formik.values.street}
                onChange={formik.handleChange("street")}
                onBlur={formik.handleBlur("street")}
              />
              <div className="error">
                {formik.touched.street && formik.errors.street}
              </div>
              <label htmlFor="" style={{ color: "#03b1fc" }}>
                City
              </label>
              <CustomInput
                type="text"
                name="city"
                placeholder="City"
                value={formik.values.city}
                onChange={formik.handleChange("city")}
                onBlur={formik.handleBlur("city")}
              />
              <div className="error">
                {formik.touched.city && formik.errors.city}
              </div>

              <div>
                <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                  <button type="submit" className="button border-0">
                    Save Changes
                  </button>
                  {/* <input type="button" className="button border-0" value={"Save Changes"}/> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
