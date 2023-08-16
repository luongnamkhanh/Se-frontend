import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const login = async (user) => {
  const response = await axios.post(`${base_url}v1/auth/sign-in`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    console.log(localStorage.getItem("user"));
  }
  return response.data;
};
const getOrders = async () => {
  const response = await axios.get(`${base_url}v1/order/pending`, config);

  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}user/getorderbyuser/${id}`,
    "",
    config,
  );

  return response.data;
};

const updateOrderStatus = async (order) => {
  const response = await axios.put(
    `${base_url}v1/order/process/${order.id}`,
    {
      staffId: order.orderData.staffId,
      shippingDate: order.orderData.shippingDate,
      orderStatus: "Processed",
    },
    config,
  );
  console.log(order.orderData.staffId);
  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  updateOrderStatus,
};

export default authService;
