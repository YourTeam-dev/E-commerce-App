import axios from "axios";
const baseUrl = process.env.REACT_APP_SERVER_API;
const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
}
export const getHeroSlider = async()=>{
    try {
        const response = await axios.get(`${baseUrl}hero/getHero`);
        if (!response.data || !Array.isArray(response.data)) {
           return []; 
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching hero slider:", error);
        return [];
    }
}
export const addHero = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}hero/addHero`, data, { headers: {
            ...headers,
           "Content-Type": "multipart/form-data",
        }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating hero:", error);
        return null;
    }
}

export const updateHero = async (id, data) => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        const response = await axios.put(`${baseUrl}hero/updateHero/${id}`, formData, { headers });
        return response.data;
    } catch (error) {
        console.error("Error updating hero:", error);
        return null;
    }
}

export const deleteHero = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}hero/deleteHero/${id}`, { headers });
        return response.data;
    } catch (error) {
        console.error("Error deleting hero:", error);
        return null;
    }
}