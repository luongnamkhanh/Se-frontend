import axios from "axios";
// import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getRatings = async (id) => {
    const response = await axios.get(`${base_url}rating/${id}`);
    console.log(response.data);
    return response.data;
}

const ratingService = {
    getRatings

};

export default ratingService;