import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  // {
  //   title: "Image",
  //   dataIndex: "image",
  // },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Model Year",
    dataIndex: "modelYear",
    sorter: (a, b) => a.modelYear - b.modelYear,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Average Rating",
    dataIndex: "averageRating",
    sorter: (a, b) => a.averageRating - b.averageRating,
  },
  {
    title: "Reviews",
    dataIndex: "reviews",
    sorter: (a, b) => a.reviews - b.reviews,
  },
  {
    title: "Discontinued",
    dataIndex: "discontinued",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: productState[i].product_id,
      title: productState[i].product_name,
      // image: productState[i].image,
      brand: productState[i].brand_name,
      category: productState[i].category_name,
      modelYear: `${productState[i].model_year}`,
      price: `${productState[i].price}`,
      averageRating: `${productState[i].avg_rating}`,
      reviews: `${productState[i].total_review}`,
      discontinued: productState[i].discontinued,
      quantity: `${productState[i].quantity}`,
      action: (
        <>
          <Link to="/" className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  console.log(data1);
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Productlist;
