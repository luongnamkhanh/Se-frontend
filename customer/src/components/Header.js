
import React, { useEffect } from "react";

import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cartImg from "../images/cart.svg";
import menu from "../images/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../features/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth)
  const name = localStorage.getItem("name");
  console.log(name);
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload()
  }  

  useEffect(() => {
    dispatch(getUserCart())
  }, [])
  const cart = useSelector((state) => state.auth.cartProducts)
  console.log(cart)
  const calculateTotalPrice = () => {
    if (!cart) return 0;

    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += parseFloat(item.total_price);
    });
    return totalPrice.toFixed(2);
  };

  const calculateTotalItem = () => {
    if (!cart) return 0;

    let totalItem = 0;
    cart.forEach((item) => {
      totalItem += 1;
    });
    return totalItem;
  };
  return (
    <>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>

                <Link to={'/'} className="text-white">KellPHONES</Link>

              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare" />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p className="mb-0">
                      Favourite <br /> wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link

                    to={name === null ? "/login" : "/profile"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={user} alt="user" />
                    {
                      name === null ? 
                      <p className="mb-0">
                        Log in <br /> My Account
                      </p> 
                      : 
                      <p className="mb-0">
                        Welcome <br/> {name}
                      </p> 
                    }

                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    // onClick={handleCart}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cartImg} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">{cart ? calculateTotalItem() : 0}</span>
                      <p className="mb-0">${cart ? calculateTotalPrice() : 0}</p>
                    </div>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="">

                          Action

                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">

                          Another action

                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">

                          Something else here

                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    {
                      name === null ? 
                      ""
                      : 
                      <button onClick={handleLogout} className="border border-0 bg-transparent text-white text-uppercase" type="button">Logout</button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};


export default Header;

