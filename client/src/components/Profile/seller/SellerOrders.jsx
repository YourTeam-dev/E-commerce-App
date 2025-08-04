import React, { useEffect, useState } from "react";
import { getOrdersWithSellerProducts } from "../../../API/HandleOrder";
import { Loader } from "lucide-react";
function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getOrdersWithSellerProducts()
      .then((res) => {
        setLoading(false);
        setOrders(res);
      })
      .catch(() => {
        setLoading(false);
      });
  });
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="overflow-x-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders <span>({orders.length})</span></h1>
      <table className="min-w-full bg-white shadow rounded-lg border border-gray-200">
        <thead className="bg-[#d58a94] text-white">
          <tr>
            <th className="text-left px-4 py-2">Order ID</th>
            <th className="text-left px-4 py-2">Customer</th>
            <th className="text-left px-4 py-2">Products</th>
            <th className="text-left px-4 py-2">Total Price</th>
            <th className="text-left px-4 py-2">Approved</th>
            <th className="text-left px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order._id}
              className="border-b border-gray-200 hover:bg-[#fef2f3] transition"
            >
              <td className="px-4 py-3 text-black">{order._id}</td>
              <td className="px-4 py-3 text-black">
                {order.userId?.name || "Unknown"}
              </td>
              <td className="px-4 py-3 text-black space-y-1">
                {order.listeProduct.map((item, idx) => (
                  <div key={idx} className="text-sm">
                    {item.productId?.title || "Deleted product"} ×{" "}
                    {item.quantity}
                  </div>
                ))}
              </td>
              <td className="px-4 py-3 text-black font-semibold">
                ${order.totalPrice}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    order.aproveIt
                      ? "bg-green-200 text-green-800"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.aproveIt ? "Approved" : "Pending"}
                </span>
              </td>
              <td className="px-4 py-3 text-black">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SellerOrders;
