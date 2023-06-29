import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getBrands = async () => {
  const response = await axios.get(`${base_url}v1/brand`);
  console.log(response.data);
  return response.data;
};

const createBrand = async (brand) => {
  const response = await axios.post(`${base_url}v1/brand`, brand);
  console.log(response.data);
  return response.data;
};
const updateBrand = async (brand) => {
  const response = await axios.patch(
    `${base_url}v1/brand/${brand.id}`,
    { brandName: brand.brandData.brandName }
  );

  return response.data;
};
const getBrand = async (id) => {
  const response = await axios.get(`${base_url}v1/brand/${id}`);
  console.log(response.data);
  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axios.delete(`${base_url}v1/brand/${id}`);

  return response.data;
};

const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
