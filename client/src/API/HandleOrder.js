import axios from "axios"

const baseUrl = process.env.REACT_APP_SERVER_API
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
}

export const handleOrder = async order => {
  try {
    const response = await axios.post(`${baseUrl}/api/orders`, order, { headers })
    return response.data
  } catch (error) {
    console.error("Error submitting order:", error)
    throw error
  }
}

export const getUserLatestOrder = async userId => {
  try {
    const response = await axios.get(`${baseUrl}/api/Order/user/${userId}`, { headers })
    return response.data
  } catch (error) {
    console.error("Error fetching user order:", error)
    throw error
  }
}
