import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { getAllCategories, deleteCategory } from "../../../API/Category";
import CategoryUpdate from "./CategoryUpdate";
import CategoryAdd from "./CategoryAdd";

function CategoriesManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateCategory, setUpdateCategory] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    deleteCategory(id)
      .then(() => {
        setCategories((prev) => prev.filter((cat) => cat._id !== id));
      })
      .catch((error) => setError(error));
  };

  return (
    <div className="relative p-8 max-w-5xl mx-auto mt-12 bg-white rounded-xl shadow-lg border border-[#d58a94]">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 rounded-xl">
          <Loader className="animate-spin text-[#d58a94]" size={40} />
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">
          Categories ({categories.length})
        </h2>
        <button
          className="bg-[#d58a94] hover:bg-[#c57a84] text-white px-4 py-2 rounded-md transition"
          onClick={() => {
            setShowAdd(true);
            setUpdateCategory(null);
          }}
        >
          + Add Category
        </button>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
          {error.message}
        </div>
      )}

      <table className="w-full text-left border-t border-gray-200">
        <thead className="bg-[#d58a94] text-white">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, idx) => (
            <tr
              key={category._id}
              className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="p-3 text-black font-medium">{category.title}</td>
              <td className="p-3 text-right space-x-2">
                <button
                  onClick={() => {
                    setShowUpdate(true);
                    setUpdateCategory(category);
                  }}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 rounded-md transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <CategoryAdd close={() => setShowAdd(false)} />
        </div>
      )}

      {showUpdate && updateCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <CategoryUpdate
            category={updateCategory}
            close={() => setShowUpdate(false)}
          />
        </div>
      )}
    </div>
  );
}

export default CategoriesManagement;
