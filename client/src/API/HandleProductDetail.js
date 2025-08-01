import axios from "axios"
const baseUrl = process.env.REACT_APP_SERVER_API

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
  }
  
};
