import React from "react";

const ProductTable = ({ products, onUpdate, onDelete }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📦 My Products</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Price</th>
            <th className="p-2">Promo</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="p-2">{p.title}</td>
              <td className="p-2">${p.price}</td>
              <td className="p-2">{p.promo}%</td>
              <td className="p-2">{p.quantity}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${
                    p.quantity > 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {p.quantity > 0 ? "Valid" : "Out of Stock"}
                </span>
              </td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => onUpdate(p)}
                  className="text-yellow-600 hover:underline"
                >
                  Update
                </button>
                <button
                  onClick={() => onDelete(p)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;