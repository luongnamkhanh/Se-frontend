import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getConfigs = async () => {
  const response = await axios.get(`${base_url}v1/config`);

  return response.data;
};
const createConfig = async (pconfig) => {
  const response = await axios.post(`${base_url}v1/config/`, pconfig, config);

  return response.data;
};

const getConfig = async (id) => {
  const response = await axios.get(`${base_url}v1/config/${id}`, config);

  return response.data;
};

const deleteConfig= async (id) => {
  const response = await axios.delete(`${base_url}v1/config/${id}`, config);
  console.log(id)
  return response.data;
};

const configService = {
  getConfigs,
  createConfig,
  getConfig,
  deleteConfig,
};

export default configService;
