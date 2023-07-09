import axios from "axios";
import { base_url } from "../../utils/baseUrl"
import { config } from "../../utils/axiosConfig";

const register = async (userData) => {
    const res = await axios.post(`${base_url}user/register`, userData);
    if (res.data) {
        return res.data;
    }
}

const login = async (userData) => {
    const res = await axios.post(`${base_url}user/login`, userData);
    if (res.data) {
        localStorage.setItem("token", JSON.stringify(res.data));
        return res.data;
    }
}

const getCart = async () => {
    const res = await axios.get(`${base_url}cart`, config)
    if(res.data)
        return res.data;
}

export const authService = {
    register,
    login,
    getCart
}