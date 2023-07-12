import axios from "axios";
import { base_url } from "../../utils/baseUrl"
import { config } from "../../utils/axiosConfig";

const getRatings = async (id) => {
    const response = await axios.get(`${base_url}rating/${id}`);
    console.log(response.data);
    return response.data;
}

const createRating = async (rating) => {
    const response = await axios.post(`${base_url}rating/${rating.product_id}`, 
    {
        rating_star: rating.rating_star,
        comment_text: rating.comment_text
    },
    config);
    console.log(rating);
    return response.data;
}


const ratingService = {
    getRatings,
    createRating

};

export default ratingService;