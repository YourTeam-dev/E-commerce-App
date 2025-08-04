import axios from "axios";

const baseUrl = process.env.REACT_APP_SERVER_API;
const jsonHeaders = {
  "Content-Type": "application/json",
};

export const getAuthHeaders = () => {
  const tokenData = localStorage.getItem("token");
  let token = null;
  try {
    token = tokenData ? JSON.parse(tokenData).token : null;
  } catch {
    token = null;
  }
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const loginApi = async (email, password) => {
  try {
    const token = await axios.post(
      `${baseUrl}users/login`,
      { email, password },
      { headers: jsonHeaders }
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
      { headers: jsonHeaders }
    );
    return token;
  } catch (error) {
    return null 
  }
};

export const getProfileApi = async () => {
  try {
    const profil = await axios.get(`${baseUrl}users/profile`, { headers: getAuthHeaders() });
    return profil.data;
  } catch (error) {
    return null;
  }
}
export const upgradeProfile= async () => {
  try {
    const response = await axios.post(`${baseUrl}users/profile`, {} ,{ headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    return null;
  }
}
