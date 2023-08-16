import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
import { changeConfirmLocale } from "antd/es/modal/locale";

const getSalesByCustomer = async (data) => {
  try {
    const { month, year } = data;
    const response = await axios.get(
      `${base_url}v1/sale/revenues/customer?month=${month}&year=${year}`,
      config,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Return empty string or undefined based on your preference
      return "";
      // return undefined;
    }
    throw error;
  }
};
const getSalesByConfig = async (data) => {
  try {
    const { month, year } = data;
    const response = await axios.get(
      `${base_url}v1/sale/revenues/config?month=${month}&year=${year}`,
      config,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Return empty string or undefined based on your preference
      return "";
      // return undefined;
    }
    throw error;
  }
};
const getSalesByItem = async (data) => {
  try {
    const { month, year } = data;
    const response = await axios.get(
      `${base_url}v1/sale/items-sold?month=${month}&year=${year}`,
      config,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Return empty string or undefined based on your preference
      return "";
      // return undefined;
    }
    throw error;
  }
};

const saleService = {
  getSalesByCustomer,
  getSalesByConfig,
  getSalesByItem,
};

export default saleService;
