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
  console.log(response.data);
  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}user/getorderbyuser/${id}`,
    "",
    config
  );

  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
};

export default authService;
