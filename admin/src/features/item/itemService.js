import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getItems = async () => {
  const response = await axios.get(`${base_url}v1/item`);
  return response.data;
};

const createItem = async (data) => {
  const response = await axios.post(`${base_url}v1/item`, data, config);
  return response.data;
};

const deleteItem = async (id) => {
  const response = await axios.delete(`${base_url}v1/item/${id}`);
  return response.data;
};

const itemService = {
  getItems,
  deleteItem,
  createItem,
};

export default itemService;
