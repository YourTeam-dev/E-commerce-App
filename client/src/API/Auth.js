import axios from 'axios';

const baseUrl = process.env.REACT_APP_SERVER_API;
const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export const loginApi = async (email, password) => await axios.post(`${baseUrl}/api/users/login`, { email, password }, { headers });

