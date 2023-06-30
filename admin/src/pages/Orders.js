import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit, BiCheckSquare } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Customer ID",
    dataIndex: "customerId",
  },
  {
    title: "Order Date",
    dataIndex: "orderDate",
  },
  {
    title: "Staff ID",
    dataIndex: "staffId",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Shipping Date",
    dataIndex: "shippingDate",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders);
  console.log(orderState);
  const data1 = [];
  if (orderState.orders && orderState.orders.length) {
    for (let i = 0; i < orderState.orders.length; i++) {
      data1.push({
        key: orderState.orders[i]['order_id'],
        customerId: orderState.orders[i]['customer_id'],
        // status: orderState.orders[i]['status'],
        orderDate: orderState.orders[i]['order_date'],
        staffId: orderState.orders[i]['staff_id'],
        amount: orderState.orders[i]['total_amount'],
        shippingDate: orderState.orders[i]['shipping_date'],
        // product: (
        //   <Link to={`/admin/order/${orderState[i].orderby._id}`}>
        //     View Orders
        //   </Link>
        // ),
        // amount: orderState[i].paymentIntent.amount,
        // date: new Date(orderState[i].createdAt).toLocaleString(),
        action: (
          <>
            <Link
              to={`/admin/order/${orderState.orders[i]['order_id']}`}
              className=" fs-3 text-danger"
            >
              <BiCheckSquare />
            </Link>
          </>
        ),
      });
    }
  }
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;