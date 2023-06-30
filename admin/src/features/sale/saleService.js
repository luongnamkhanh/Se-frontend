import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getSalesByCustomer = async (data) => {
    const { month, year } = data;
    const response = await axios.get(
      `${base_url}v1/sale/revenues/customer?month=${month}&year=${year}`,
      config
    );
  
    return response.data;
  };
const getSalesByConfig = async (data) => {
    const response = await axios.get(`${base_url}v1/sale/revenues/config?month=${data.month}&year=${data.year}`, config);

    return response.data;
}
const getSalesByItem = async (data) => {
    const response = await axios.get(`${base_url}v1/sale/items-sold?month=${data.month}&year=${data.year}`, config);

    return response.data;
}

const saleService = {
    getSalesByCustomer,
    getSalesByConfig,
    getSalesByItem
};

export default saleService;
