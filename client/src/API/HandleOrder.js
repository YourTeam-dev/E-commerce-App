import axios from "axios"

const baseUrl = process.env.REACT_APP_SERVER_API
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`
}

export const handleOrder = async order => {
  try {
    const response = await axios.post(`${baseUrl}/api/orders`, order, { headers })
    return response.data
  } catch (error) {
    console.error("Error submitting order:", error)
    return null
  }
}

export const getUserLatestOrder = async userId => {
  try {
    const response = await axios.get(`${baseUrl}/api/Order/user/${userId}`, { headers })
    return response.data
  } catch (error) {
    console.error("Error fetching user order:", error)
    return null
  }
}

export const getOrdersWithSellerProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/Order/orders-specific-seller`, { headers })
    return response.data
  } catch (error) {
    console.error("Error fetching user order:", error)
    return []
  }
}

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/Order`, { headers })
    return response.data
  } catch (error) {
    console.error("Error fetching all orders:", error)
    return []
  }
}

export const validateOrder = async (orderId, approve = true) => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/Order/${orderId}/validate`,
      { approveIt: approve },
      { headers }
    )
    return response.data
  } catch (error) {
    console.error("Error validating order:", error)
    return null
  }
}
