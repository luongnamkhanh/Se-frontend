import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}v1/product`);

  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}v1/product/`, product, config);

  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${base_url}v1/product/${id}`, config);

  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}v1/product/${id}`, config);
  console.log(id);
  return response.data;
};

const updateProduct = async (product) => {
  console.log(product);
  const response = await axios.patch(
    `${base_url}v1/product/${product.id}`,
    { productName: product.productData.productName },
    config,
  );
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
};

export default productService;
