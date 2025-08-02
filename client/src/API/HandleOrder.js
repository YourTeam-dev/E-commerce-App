import axios   from "axios";

const baseUrl = process.env.REACT_APP_SERVER_API;
const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export const handleOrder = async (order) => await axios.post(`${baseUrl}/api/orders`, order, { headers });