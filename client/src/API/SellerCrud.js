import axios from "axios";

const baseUrl = process.env.REACT_APP_SERVER_API;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export const fetchProducts = async (sellerId) => {
  try {
    const res = await axios.get(
      `${baseUrl}sellerproduct/${sellerId}/products`,
      { headers }
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};

export const addProduct = async (sellerId, newProduct) => {
  try {
    await axios.post(
      `${baseUrl} sellerproduct/${sellerId}/products`,
      newProduct,
      { headers }
    );
    return true;
  } catch (err) {
    console.error("Error adding product:", err);
    return false;
  }
};

export const deleteProduct = async (sellerId, productId) => {
  try {
    await axios.delete(
      `${baseUrl}sellerproduct/${sellerId}/products/${productId}`,
      { headers }
    );
    return true;
  } catch (err) {
    console.error("Error deleting product:", err);
    return false;
  }
};

export const updateProduct = async (sellerId, productId, body) => {
  try {
    await axios.put(
      `${baseUrl}sellerproduct/${sellerId}/products/${productId}`,
      body,
      { headers }
    );
    return true;
  } catch (err) {
    console.error("Error updating product:", err);
    return false;
  }
};
