import axios from "axios"

// src/api/handleproduct.js ✅
export const getProductById = async (id) => {
  const response = await axios.get(`http://localhost:5000/api/products/${id}`);
  return response.data;
};
