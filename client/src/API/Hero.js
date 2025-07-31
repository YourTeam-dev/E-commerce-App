import axios from "axios";
const baseUrl = process.env.REACT_APP_SERVER_API;
const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
}
export const getHeroSlider = async()=>{
    try {
        const response = await axios.get(`${baseUrl}hero/getHero`);
        return response.data;
    } catch (error) {
        console.error("Error fetching hero slider:", error);
    }
}
export const addHero = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}hero/addHero`, data, { headers });
        return response.data;
    } catch (error) {
        console.error("Error creating hero:", error);
        return null;
    }
}

export const updateHero = async (id, data) => {
    try {
        const response = await axios.put(`${baseUrl}hero/updateHero/${id}`, data, { headers });
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