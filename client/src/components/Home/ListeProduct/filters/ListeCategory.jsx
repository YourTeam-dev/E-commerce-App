import React, { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { getAllCategories } from '../../../../API/Category';

function ListeCategory({ selectedCategory, selectedCategoryId = null }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(selectedCategoryId);

  useEffect(() => {
    getAllCategories().then((res) => {
      setCategories(res);
      setLoading(false);
    });
  }, []);

  // Handle radio change and notify parent
  const handleChange = (cat) => {
    setSelectedId(cat._id);
    if (selectedCategory) selectedCategory(cat);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  const selectedCat = categories.find((c) => c._id === selectedId);

  return (
    <div>
      <p className="font-semibold mb-2">Categories</p>
      <div className="space-y-2">
        {categories.map((category) => (
          <label
            key={category._id}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              name="category"
              value={category._id}
              checked={selectedId === category._id}
              onChange={() => handleChange(category)}
              className="accent-blue-600"
            />
            <span className="text-gray-800 font-medium">{category.title}</span>
          </label>
        ))}

        {/* Show subcategories of the selected category */}
        {selectedCat && selectedCat.children && selectedCat.children.length > 0 && (
          <div className="ml-6 mt-2 space-y-1">
            {selectedCat.children.map((sub) => (
              <label
                key={sub._id}
                className="flex items-center space-x-2 cursor-default"
              >
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="accent-green-600"
                />
                <span className="text-sm text-gray-700">{sub.title}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListeCategory;
