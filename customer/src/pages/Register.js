import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { useState } from "react";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  let error = [];
  const [errorState, setErrorState] = useState(error);

  let userCollectionRef = db.ref("users");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorState(() => []);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((createdUser) => {
        alert("Register successfully, please login");
        updateuserDetails(createdUser);
        navigate('/login')
      })
      .catch((serverError) => {
        setErrorState((error) => error.concat(serverError));
      });
  };

  const updateuserDetails = (createdUser) => {
    if (createdUser) {
      createdUser.user
        .updateProfile({
          displayName: name,
          phoneNumber : phoneNumber
        })
        .then(() => {
          saveUserInDB(createdUser);
        })
        .catch((serverError) => {
          setErrorState((error) => error.concat(serverError));
        });
    }
  };

  const saveUserInDB = (createdUser) => {
    userCollectionRef
      .child(createdUser.user.uid)
      .set({
        displayName: createdUser.user.displayName,
        phoneNumber: createdUser.user.phoneNumber,
      })
      .then(() => {
        console.log(createdUser.user)
      })
      .catch((serverError) => {
        setErrorState((error) => error.concat(serverError));
      });
  };

  const formaterrors = () => {
    return errorState.map((error, index) => (
      <p key={index} style={{ color: "red" }}>
        {error.message}
      </p>
    ));
  };

  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form
                action=""
                className="d-flex flex-column gap-15"
                onSubmit={handleSubmit}
              >
                <CustomInput
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <CustomInput
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div>
                  {errorState.length > 0 && (
                    <div error>
                      <h3>Errors</h3>
                      {formaterrors()}
                    </div>
                  )}
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Register;
