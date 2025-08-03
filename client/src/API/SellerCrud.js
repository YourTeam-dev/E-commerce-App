import axios from "axios";

const baseUrl = process.env.REACT_APP_SERVER_API;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export const fetchProducts = async () => {
  try {
    const res = await axios.get(
      `${baseUrl}seller-product/products`,
      { headers }
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};

export const addProduct = async (newProduct) => {
  try {
    const formData = new FormData();
    
    for (const key in newProduct) {
      if (key === "images") {
        newProduct.images.forEach((img) => formData.append("images", img));
      } else if (Array.isArray(newProduct[key])) {
        newProduct[key].forEach((val) => formData.append(key, val));
      } else {
        formData.append(key, newProduct[key]);
      }
    }

    await axios.post(`${baseUrl}seller-product/products`, formData, {
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) { 
    console.error("Error adding product:", err);
    return false;
  }
};


export const deleteProduct = async (productId) => {
  try {
    await axios.delete(
      `${baseUrl}seller-product/products/${productId}`,
      { headers }
    );
    return true;
  } catch (err) {
    console.error("Error deleting product:", err);
    return false;
  }
};

export const updateProduct = async (productId, body) => {
  try {
    await axios.put(
      `${baseUrl}seller-product/products/${productId}`,
      body,
      { headers }
    );
    return true;
  } catch (err) {
    console.error("Error updating product:", err);
    return false;
  }
};
