import React, { useState } from 'react';
import { updateCategory } from '../../../API/Category';
import { Loader, X } from 'lucide-react';

function CategoryUpdate({ category, close }) {
  const [title, setTitle] = useState(category?.title || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await updateCategory(category._id, { title });
      close();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-30 bg-black/50 flex items-center justify-center">
      <div
        className="bg-white w-full max-w-md rounded-xl p-6 relative shadow-xl border border-[#d58a94]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-3 right-3 text-[#d58a94] hover:text-[#c57a84] transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-black mb-4">Update Category</h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
            {error.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d58a94]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-[#d58a94] hover:bg-[#c57a84] text-white font-semibold py-2 px-4 rounded-md transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? <Loader className="animate-spin" size={20} /> : 'Update Category'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CategoryUpdate;
