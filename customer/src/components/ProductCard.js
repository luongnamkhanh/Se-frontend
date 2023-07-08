import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";

const ProductCard = (props) => {
  const { grid, product } = props; // Receive product as a prop
  console.log(product);
  let location = useLocation();
  if (!product) return null; // If product is null, return null
  return (
    <div
      className={`${
        location.pathname === "/product" ? `gr-${grid}` : "col-3"
      }`}
    >
      <Link
        to={`${
          location.pathname === "/"
            ? `/product/${product.product_id}`
            : location.pathname === `/product/${product.product_id}`
            ? `/product/${product.product_id}`
            : `${product.product_id}`
        }`}
        className="product-card position-relative"
      >
        <div className="wishlist-icon position-absolute">
          <button className="border-0 bg-transparent">
            <img src={wish} alt="wishlist" />
          </button>
        </div>
        <div className="product-image">
          <img src={product.image} className="img-fluid" alt="product" />
          <img src={product.image} className="img-fluid" alt="product" />
        </div>
        <div className="product-details">
          <h6 className="brand">{product.brand_name}</h6>
          <h5 className="product-title">{product.product_name}</h5>
          <ReactStars
            count={5}
            size={24}
            value={parseFloat(product.avg_rating)}
            edit={false}
            activeColor="#ffd700"
          />
          <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
            {product.description}
          </p>
          <p className="price">${product.list_price}</p>
        </div>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-15">
            <button className="border-0 bg-transparent">
              <img src={prodcompare} alt="compare" />
            </button>
            <button className="border-0 bg-transparent">
              <img src={view} alt="view" />
            </button>
            <button className="border-0 bg-transparent">
              <img src={addcart} alt="addcart" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
