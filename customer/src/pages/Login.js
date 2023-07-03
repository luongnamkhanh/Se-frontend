import React from "react";
import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { auth } from "../store/firebase";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  let error = [];
  const [errorState, setErrorState] = useState(error);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorState(() => []);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user.user);
        alert("Login successfully");
        navigate('/');
      })
      .catch((serverError) => {
        setErrorState((error) => error.concat(serverError));
});
  };

  const formaterrors = () => {
    return errorState.map((error, index) => <p key={index} style={{color : "red"}}>{error.message}</p>);
  };
  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <form
                action=""
                className="d-flex flex-column gap-15"
                onSubmit={handleSubmit}
              >
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div>
                  <Link to="/forgot-password">Forgot Password?</Link>

                  {errorState.length > 0 && (
                    <div error>
                      {formaterrors()}
                    </div>
                  )}

                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Login
                    </button>

                    <Link to="/register" className="button signup">
                      Register
                    </Link>
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

export default Login;
