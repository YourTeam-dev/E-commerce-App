import axios from "axios";

const baseUrl = process.env.REACT_APP_SERVER_API;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export const loginApi = async (email, password) => {
  try {
    const token = await axios.post(
      `${baseUrl}users/login`,
      { email, password },
      { headers }
    );
    return token;
  } catch (error) {
    return null;
  }
};

export const signupApi = async (name, email, password) => {
  try {
    const token = await axios.post(
      `${baseUrl}users/signup`,
      { name, email, password },
      { headers }
    );
    return token;
  } catch (error) {
    return null 
  }
};

export const getProfileApi = async () => {
  try {
    const profil = await axios.get(`${baseUrl}users/profile`, { headers });
    return profil.data;
  } catch (error) {
    return null;
  }
}
export const upgradeProfile= async () => {
  try {
    const response = await axios.post(`${baseUrl}users/profile`, {} ,{ headers });
    return response.data;
  } catch (error) {
    return null;
  }
}