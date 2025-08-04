import React from "react";

function UpdateProductModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold mb-4">Update Product</h2>
          <button onClick={onClose} className="text-gray-600 hover:underline">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProductModal;
