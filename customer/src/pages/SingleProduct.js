import React, { useEffect, useState } from "react";

import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAProduct, resetState } from "../features/product/productSlice";
import { getRatings, createRating } from "../features/rating/ratingSlice";
import { addToCart } from "../features/cart/cartSlice";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[2];
  console.log(getProductId);
  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getAProduct(getProductId));
      dispatch(getRatings(getProductId));
    } else {
      dispatch(resetState());
    }
  }, [getProductId]);
  const product = useSelector((state) => state.product.productName);
  console.log(product);
  const [ratingList, setRatingList] = useState([]);
  const rating = useSelector((state) => state.rating.ratings);
  useEffect(() => {
    setRatingList(rating);
  }, [rating]);
  console.log(ratingList);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const handleConfigSelect = (config) => {
    setSelectedConfig(config);
  };
  const [quantitySelected, setQuantitySelected] = useState(null);
  const navigateToCart = () => {
    navigate('/cart')
  }

  const [orderedProduct, setorderedProduct] = useState(true);
  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  //
  const [ratingText, setRatingText] = useState("");
  const [ratingStars, setRatingStars] = useState(0);
  const name = localStorage.getItem("name");
  const handleRatingStarsChange = (newRating) => {
    setRatingStars(newRating);
  };

  const handleRatingTextChange = (event) => {
    setRatingText(event.target.value);
  };
  const handleSubmitReview = async (event) => {
    event.preventDefault();
    const data = {
      product_id: getProductId,
      rating_star: ratingStars,
      comment_text: ratingText,
    };
    console.log(data);
    dispatch(createRating(data))
      .then(() => {
        const newRating = {
          full_name: name, // Replace with the appropriate name
          rating_star: ratingStars,
          comment_text: ratingText,
        };
        setRatingText("");
        setRatingStars(0);
        setRatingList((prevRating) => [...prevRating, newRating]);
        console.log(ratingList);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  //
  const closeModal = () => { };
  if (!product) return null;
  const configurations = product.map((config) => ({
    id: config.config_id,
    ram: config.ram,
    rom: config.rom,
    color: config.color,
    image: config.image,
  }));
  const props = {
    width: 594,
    height: 600,
    zoomWidth: 600,
    img: selectedConfig ? selectedConfig.image : product[0]?.image,
  };

  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title="Product Name" />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{product[0]?.product_name}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">{product[0]?.price}$</p>

                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={product[0]?.avg_rating}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">( {ratingList?.length} Reviews )</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand :</h3>
                  <p className="product-data">{product[0]?.brand_name}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">{product[0]?.category_name}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Model Year :</h3>
                  <p className="product-data">{product[0]?.model_year}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availablity :</h3>
                  <p className="product-data">
                    {product[0]?.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Configuration :</h3>
                  {configurations.map((config, index) => (
                    <div
                      key={index}
                      className="d-flex flex-wrap gap-15 hover cursor-pointer"
                      onClick={() => handleConfigSelect(config)}
                    >
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        <span>Ram: {config.ram} </span>
                        <span>Rom: {config.rom} </span>
                        <span>Color: {config.color}</span>
                      </span>
                    </div>
                  ))}
                </div>

                {/* <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Color :</h3>
                  <Color />
                </div> */}

                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  <h3 className="product-heading">Quantity :</h3>
                  <div className="">
                    <input
                      type="number"
                      name="quantity-selected"
                      min={1}
                      max={10}
                      className="form-control"
                      style={{ width: "70px" }}
                      id=""
                    />
                  </div>
                  <div className="d-flex align-items-center gap-30 ms-5">
                    <button
                      className="button border-0"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      type="button"
                      onClick={() => {
                        const selectedQuantity  = document.querySelector(
                          'input[name="quantity-selected"]'
                        ).value;
                        setQuantitySelected(selectedQuantity);
                        dispatch(
                          addToCart({
                            config_id: selectedConfig?.id,
                            quantity: selectedQuantity,
                          })
                        );
                      }}
                    >
                      Add to Cart
                    </button>
                    <button className="button signup">Buy It Now</button>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <a href="">
                      <TbGitCompare className="fs-5 me-2" /> Add to Compare
                    </a>
                  </div>
                  <div>
                    <a href="">
                      <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
                    </a>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Shipping & Returns :</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> We
                    ship all US domestic orders within
                    <b>5-10 business days!</b>
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Product Link:</h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(
                        "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                      );
                    }}
                  >
                    Copy Product Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tenetur nisi similique illum aut perferendis voluptas, quisquam
                obcaecati qui nobis officia. Voluptatibus in harum deleniti
                labore maxime officia esse eos? Repellat?
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={product[0]?.avg_rating}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on {ratingList?.length} Reviews</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                <form onSubmit={handleSubmitReview} className="d-flex flex-column gap-15">
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={ratingStars}
                      edit={true}
                      activeColor="#ffd700"
                      onChange={handleRatingStarsChange}
                    />
                  </div>
                  <div>
                    <textarea
                      name="ratingText"
                      id="ratingText"
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                      value={ratingText}
                      onChange={handleRatingTextChange}
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="button border-0">Submit Review</button>
                  </div>
                </form>
              </div>
              <div className="reviews mt-4">
                {ratingList.map((rating, index) => (
                  <div className="review" key={index}>
                    <div className="d-flex gap-10 align-items-center">
                      <h6 className="mb-0">{rating.full_name}</h6>
                      <ReactStars
                        count={5}
                        size={24}
                        value={rating.rating_star}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                    <p className="mt-3">{rating.comment_text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard />
        </div>
      </Container>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header py-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 w-50">
                  <img src={selectedConfig?.image} className="img-fluid" alt="product imgae" />
                </div>
                <div className="d-flex flex-column flex-grow-1 w-50">
                  <h6 className="mb-3">{product[0]?.product_name}</h6>
                  <p className="mb-1">Quantity: {quantitySelected}</p>
                  <p className="mb-1">Color: {selectedConfig?.color}</p>
                  {/* <p className="mb-1">Size: asgfd</p> */}
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 py-0 justify-content-center gap-30">
              <button type="button" className="button" data-bs-dismiss="modal" onClick={navigateToCart}>
                View My Cart
              </button>
              <button type="button" className="button signup">
                Checkout
              </button>
            </div>
            <div className="d-flex justify-content-center py-3">
              <Link
                className="text-dark"
                to="/product"
                onClick={() => {
                  closeModal();
                }}
              >
                Continue To Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
