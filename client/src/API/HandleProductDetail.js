import axios from "axios"

// src/api/handleproduct.js ✅
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error; // Re-throw the error for further handling if needed
  }
  
};
export const getCommentsByProductId = async (productId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/comments/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments by product ID:", error);
    throw error;
  }
};
