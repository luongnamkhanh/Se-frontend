import axios from "axios";
import { base_url } from "../../utils/baseUrl"
import { config } from "../../utils/axiosConfig";

const addCart = async (cartData) => {
    const res = await axios.post(`${base_url}cart`, cartData, config);
    if(res.data)
        return res.data;
}

export const cartService = {
    addCart
}  