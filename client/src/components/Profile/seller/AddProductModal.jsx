import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../../API/Category";
import { Loader } from "lucide-react";
import { addProduct } from "../../../API/SellerCrud";

const COLORS = ["Red", "Blue", "Green", "Black", "White"];
const SIZES = ["S", "M", "L", "XL"];

function AddProductModal({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    color: [],
    size: [],
    quantity: 0,
    promo: 0,
    images: [],
    categoryId: "",
  });

  const [category, setCategory] = useState([]);

  useEffect(() => {
    getAllCategories()
      .then((data) => setCategory(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, images: Array.from(files) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheck = (e, type) => {
    const value = e.target.value;
    setFormData((prev) => {
      const arr = new Set(prev[type]);
      e.target.checked ? arr.add(value) : arr.delete(value);
      return { ...prev, [type]: Array.from(arr) };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.images.length) newErrors.images = "At least one image is required";
    if (!formData.categoryId) newErrors.categoryId = "Category is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    if (!formData.color.length) newErrors.color = "Select at least one color";
    if (!formData.size.length) newErrors.size = "Select at least one size";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    addProduct(formData)
      .then(() => {
        setLoading(false);
        onClose(); // Optionally close modal on success
      })
      .catch((err) => {
        console.error("Error adding product:", err);
        setLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 w-6/12 rounded shadow-md mt-10 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 border-b border-[#d58a94] pb-1">
          <h2 className="text-xl text-[#d58a94] font-bold mb-4">Add Product</h2>
          <button onClick={onClose} className="text-gray-600 hover:underline text-2xl">
            &times;
          </button>
        </div>

        <form   onSubmit={handleSubmit} encType="multipart/form-data" className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <input
              name="title"
              onChange={handleChange}
              placeholder="Title"
              className="border border-gray-300 p-2 w-full rounded"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div className="col-span-1">
            <input
              name="price"
              type="number"
              onChange={handleChange}
              placeholder="Price"
              className="border border-gray-300 p-2 w-full rounded"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>

          <div className="col-span-2">
            <textarea
              name="description"
              onChange={handleChange}
              placeholder="Description"
              className="border border-gray-300 p-2 w-full rounded"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700 mb-1">Images</label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
            />
            {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700 mb-1">Category</label>
            <select
              name="categoryId"
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
            >
              <option value="">Select Category</option>
              {category.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId}</p>}
          </div>

          <div className="col-span-1">
            <input
              name="quantity"
              type="number"
              onChange={handleChange}
              placeholder="Quantity"
              className="border border-gray-300 p-2 w-full rounded"
            />
            {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
          </div>

          <div className="col-span-1">
            <input
              name="promo"
              type="number"
              onChange={handleChange}
              placeholder="Promo (%)"
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700 mb-1">Colors</label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <label key={color} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value={color}
                    onChange={(e) => handleCheck(e, "color")}
                  />
                  {color}
                </label>
              ))}
            </div>
            {errors.color && <p className="text-red-500 text-sm">{errors.color}</p>}
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700 mb-1">Sizes</label>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <label key={size} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value={size}
                    onChange={(e) => handleCheck(e, "size")}
                  />
                  {size}
                </label>
              ))}
            </div>
            {errors.size && <p className="text-red-500 text-sm">{errors.size}</p>}
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className="col-span-2 bg-[#d58a94] text-white px-4 py-2 rounded hover:bg-[#d58a94]/80"
          >
            {loading ? <Loader className="animate-spin w-5 h-5 mx-auto" /> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
