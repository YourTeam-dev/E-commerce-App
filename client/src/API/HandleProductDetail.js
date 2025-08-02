import axios from "axios";
const baseUrl = process.env.REACT_APP_SERVER_API;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
  }
};

export const updateReviewCount = async (id, review) => {
  try {
    const response = await axios.put(
      `${baseUrl}reviews/${id}`,
      { review },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating review count:", error);
  }
};
export const addComment = async (id, comment) => {
  try {
    const response = await axios.post(
      `${baseUrl}comments/addComment`,
      { productId: id, commentText: comment },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};
