import axios from "axios";
const baseUrl = process.env.REACT_APP_SERVER_API;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export const getFiltredProduct = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/products/getFiltredProduct`, {
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
    console.error("Error fetching product by category:", error);
    return null;
  }
}
export const getFeaturedProduct = async () => {
  try {
    console.log("Fetching featured product...", baseUrl);
    const response = await axios.get(`${baseUrl}products/FeaturedProduct`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching featured product:", error);
    return null;
  }
}