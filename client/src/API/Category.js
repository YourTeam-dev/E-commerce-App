import axios from "axios";
const baseUrl = process.env.REACT_APP_SERVER_API;
const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
}
export const getAllCategories = async () => {
    try {
        const response = await axios.get( `${baseUrl}category/getAllCategories`);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

export const getCategoryPath = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/category/getCategoryPath/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching category path:", error);
        return [];
    }
};
export const updateCategory = async (id, data) => {
    try {
        const response = await axios.put(`${baseUrl}/category/updateCategory/${id}`, data, { headers });
        return response.data;
    } catch (error) {
        console.error("Error updating category:", error);
        return null;
    }
};
export const deleteCategory = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/category/deleteCategory/${id}`, { headers });
        return response.data;
    } catch (error) {
        console.error("Error deleting category:", error);
        return null;
    }
};
export const createCategory = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/category/addCategory`, data, { headers });
        return response.data;
    } catch (error) {
        console.error("Error creating category:", error);
        return null;
    }
}
export const getFeaturedCategories = async () => {
    try {
        const response = await axios.get(`${baseUrl}category/getFeaturedCategories`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching featured categories:", error);
        return [];
    }
};