import React, { useState } from "react";
import { addHero } from "../../../API/Hero";
import { Loader } from "lucide-react";

function HeroAdd({ close, category }) {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: null,
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    addHero(data)
      .then((response) => {
        if (response) close();
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  return (
    <div className="relative bg-white p-8 rounded-2xl shadow-xl mt-16 border border-[#d58a94]">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 rounded-2xl">
          <Loader className="animate-spin text-[#d58a94]" size={40} />
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Add Hero</h2>
        <button
          onClick={close}
          type="button"
          className="text-black ml-auto bg-[#d58a94] hover:bg-[#c57a84] px-4 py-1 rounded-md transition"
        >
          Close
        </button>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
          {error.message || "Something went wrong"}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "subtitle"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-black capitalize mb-1">
              {field}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d58a94]"
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d58a94]"
          >
            <option value="">Select Category</option>
            {category.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-1">Description</label>
          <textarea
            name="description"
            rows="2"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d58a94]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
            className="w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-[#d58a94] file:text-white hover:file:bg-[#c57a84]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#d58a94] hover:bg-[#c57a84] text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Add Hero
        </button>
      </form>
    </div>
  );
}

export default HeroAdd;
