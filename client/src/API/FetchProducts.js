import axios from "axios";
const baseUrl = process.env.REACT_APP_SERVER_API;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export const getFiltredProduct = async (data) => {
  try {
    const response = await axios.get(`${baseUrl}products/getFiltredProduct`, {
      params: data,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching filtred product:", error);
    return null;
  }
};
export const getProductByCategory = async (id) => {
  try {
    const response = await axios.get(
      `${baseUrl}products/getProductByCategory/${id}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
}
export const getFeaturedProduct = async () => {
  try {
    const response = await axios.get(`${baseUrl}products/FeaturedProduct`);
    return response.data;
  } catch (error) {
    return null;
  }
}