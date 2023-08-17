import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../features/user/userSlice";
import { removeCart, removeAllCart } from "../features/cart/cartSlice";
import CustomModal from "../components/CustomModal";

const Cart = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserCart())
  }, [])

  const cart = useSelector((state) => state.auth.cartProducts)
  console.log(cart)
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart?.forEach((item) => {
      totalPrice += parseFloat(item.total_price);
    });
    return totalPrice;
  };
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openClearModal, setOpenClearModal] = useState(false);
  const [configId, setConfigId] = useState("");
  const showModal = (e) => {
    setOpenDeleteModal(true);
    setConfigId(e);
  };
  const showModal1 = () => {
    setOpenClearModal(true);
  };
  const hideModal = () => {
    setOpenDeleteModal(false);
    setOpenClearModal(false);
  };
  const removeACart = (e) => {
    dispatch(removeCart(e));

    setOpenDeleteModal(false);
    setTimeout(() => {
      dispatch(getUserCart());
    }, 100);
  };
  const removeAll = () => {
    dispatch(removeAllCart());
    setOpenClearModal(false);
    setTimeout(() => {
      dispatch(getUserCart());
    }, 100);
  };
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {cart?.map((item, index) => (
              <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center" key={index}>
                <div className="cart-col-1 gap-15 d-flex align-items-center">
                  <div className="w-25">
                    <img src={item.image} className="img-fluid" alt="product image" />
                  </div>
                  <div className="w-75">
                    <p>{item.product_name}</p>
                    <p>Color: {item.color}</p>
                    {item.ram && <p>RAM: {item.ram}</p>}
                    {item.rom && <p>ROM: {item.rom}</p>}
                  </div>
                </div>
                <div className="cart-col-2">
                  <h5 className="price">$ {item.total_price / item.quantity}</h5>
                </div>
                <div className="cart-col-3 d-flex align-items-center gap-15">
                  <div>
                    <input
                      className="form-control"
                      type="number"
                      name=""
                      min={1}
                      max={10}
                      id=""
                      value={item.quantity}
                      disabled
                    />
                  </div>
                  <button
                    className="ms-3 fs-3 text-danger bg-transparent border-0"
                    onClick={() => showModal(item.config_id)}
                  >
                    <AiFillDelete />
                  </button>
                </div>
                <div className="cart-col-4">
                  <h5 className="price">$ {item.total_price}</h5>
                </div>
              </div>
            ))}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <div>
                <Link to="/product" className="button">
                  Continue To Shopping
                </Link>
                <br /><br />
                <button
                  className="button"
                  onClick={() => showModal1()}
                >
                  {/* <AiFillDelete /> */}
                  Clear Cart
                </button>
              </div>

              <div className="d-flex flex-column align-items-end">
                <h4>SubTotal: $ {calculateTotalPrice()}</h4>
                <p>Taxes and shipping calculated at checkout</p>
                <Link to="/checkout" className="button">
                  Checkout
                </Link>
              </div>
            </div>

          </div>
        </div>
      </Container>
      <CustomModal
        hideModal={hideModal}
        open={openDeleteModal}
        performAction={() => {
          removeACart(configId);
        }}
        title="Are you sure you want to delete this?"
      />
      <CustomModal
        hideModal={hideModal}
        open={openClearModal}
        performAction={() => {
          removeAll();
        }}
        title="Are you sure you want to delete all the product?"
      />
    </>
  );
};

export default Cart;
