
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};
// Historic API service
class HistoricAPI {
  // Get user historic records
  static async getUserHistoric(userId) {
    try {
      const response = await axios.get(`${API_URL}historic/user/${userId}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching user historic:', error);
      throw error;
    }
  }

  // // Create new historic record
  // static async createHistoric(data) {
  //   try {
  //     const response = await axios.post(`${API_URL}historic`, data, { headers });
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error creating historic record:', error);
  //     throw error;
  //   }
  // }

  // Get all historic records (admin)
  static async getAllHistoric() {
    try {
      const response = await axios.get(`${API_URL}historic`, { headers});
      return response.data;
    } catch (error) {
      console.error('Error fetching all historic records:', error);
      throw error;
    }
  }

  // // Delete historic record
  // static async deleteHistoric(id) {
  //   try {
  //     const response = await axios.delete(`${API_URL}historic/${id}`, { headers });
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error deleting historic record:', error);
  //     throw error;
  //   }
  // }
}

export default HistoricAPI;

