import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProducts, resetState } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand - b.brand,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category - b.category,
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
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [pId, setpId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setpId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetState());
  }, []);
  const productState = useSelector((state) => state.product.products.products);

  const data = productState?.map((product, index) => ({
    key: product.product_id,
    title: product.product_name,
    brand: product.brand_name,
    category: product.category_name,
    modelYear: product.model_year,
    price: product.list_price,
    averageRating: product.avg_rating,
    reviews: product.total_review,
    discontinued: product.discontinued ? "Yes" : "No",
    action: (
      <>
        {/* <Link
          to={`/admin/product/${product.product_id}`}
          className=" fs-3 text-danger"
        >
          <BiEdit />
        </Link> */}
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(product.product_id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          dispatch(deleteProduct(pId));
          hideModal();
        }}
        title="Are you sure you want to delete this Product?"
      />
    </div>
  );
};

export default Productlist;
