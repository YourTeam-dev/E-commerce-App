import React, { useState } from "react";

const initialState = {
  title: "",
  description: "",
  color: "",
  size: "",
  images: "",
  price: "",
  promo: "",
  quantity: "",
  rating: "",
};

const AddProductForm = ({ onAdd }) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">➕ Add Product</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(form).map(([key, value]) => (
          key === "description" ? (
            <textarea
              key={key}
              name={key}
              placeholder="Description"
              value={value}
              onChange={handleChange}
              rows={3}
              className="border p-2 rounded-md resize-none"
            />
          ) : (
            <input
              key={key}
              name={key}
              type={
                ["price", "promo", "quantity", "rating"].includes(key)
                  ? "number"
                  : "text"
              }
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={value}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          )
        ))}
      </div>
      <button
        onClick={() => onAdd(form)}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProductForm;