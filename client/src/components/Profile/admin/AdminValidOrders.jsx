import React, { useEffect, useState } from "react"
import axios from "axios"

const AdminValidOrders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/Order")
        const cleaned = res.data.map(order => ({
          ...order,
          listeProduct: (order.listeProduct || []).filter(p => p.productId)
        }))
        setOrders(cleaned)
      } catch (err) {
        console.error("Failed to fetch orders:", err)
      }
    }

    fetchOrders()
  }, [])

  const handleValidate = async (orderId, productId) => {
    try {
      await axios.patch(`http://localhost:5000/api/Order/${orderId}/products/${productId}/validate`)

      setOrders(prevOrders =>
        prevOrders
          .map(order => {
            if (order._id === orderId) {
              const updatedProducts = order.listeProduct
                .map(prod =>
                  prod.productId._id === productId
                    ? { ...prod, status: "validated" }
                    : prod
                )
                .filter(prod => prod.status !== "validated")
              return { ...order, listeProduct: updatedProducts }
            }
            return order
          })
          .filter(order => order.listeProduct.length > 0)
      )

      alert(`✅ Product ${productId} validated in order ${orderId}`)
    } catch (error) {
      console.error("Validation error:", error)
      alert("Failed to validate product.")
    }
  }

  const handleReject = async (orderId, productId) => {
    if (!window.confirm("Are you sure you want to reject this product?")) return
    try {
      await axios.delete(`http://localhost:5000/api/Order/${orderId}/products/${productId}/reject`)

      setOrders(prevOrders =>
        prevOrders
          .map(order => {
            if (order._id === orderId) {
              const updatedProducts = order.listeProduct.filter(
                prod => prod.productId._id !== productId
              )
              return { ...order, listeProduct: updatedProducts }
            }
            return order
          })
          .filter(order => order.listeProduct.length > 0)
      )

      alert(`❌ Product ${productId} rejected and removed from order ${orderId}`)
    } catch (error) {
      console.error("Rejection error:", error)
      alert("Failed to reject product.")
    }
  }

function AdminValidOrders() {
  

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">🛒 Admin - Validate Orders</h1>
      {orders.length === 0 && (
        <p className="text-green-600">✅ All orders processed!</p>
      )}

      {orders.map(order => (
        <div
          key={order._id}
          className="border border-gray-300 rounded p-4 mb-6 shadow-sm"
        >
          <div className="mb-2">
            <strong>Order ID:</strong> {order._id} <br />
            <strong>Customer:</strong> {order.userId?.name || "N/A"} <br />
            <strong>Total Price:</strong> ${order.totalPrice} <br />
            <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
          </div>

          <table className="w-full text-left border-t border-gray-200 mt-4">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="py-2 px-2">Product</th>
                <th className="py-2 px-2">Qty</th>
                <th className="py-2 px-2">Price</th>
                <th className="py-2 px-2">Stock</th>
                <th className="py-2 px-2">Status</th>
                <th className="py-2 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {order.listeProduct.map(prod => (
                <tr key={prod.productId._id} className="border-b">
                  <td className="py-2 px-2">{prod.productId.title}</td>
                  <td className="py-2 px-2">{prod.quantity}</td>
                  <td className="py-2 px-2">${prod.productId.price}</td>
                  <td className="py-2 px-2">{prod.productId.quantity}</td>
                  <td className="py-2 px-2">{prod.status}</td>
                  <td className="py-2 px-2">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded mr-2"
                      onClick={() =>
                        handleValidate(order._id, prod.productId._id)
                      }
                    >
                      ✅ Validate
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() =>
                        handleReject(order._id, prod.productId._id)
                      }
                    >
                      ❌ Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

export default AdminValidOrders
