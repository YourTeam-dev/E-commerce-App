import React, { useState } from 'react';
import PriceRangeSlider from './filters/PriceRange';
import StarRatingFilter from './filters/RatingRange';

const categories = ['Electronics', 'Clothing', 'Books', 'Beauty', 'Home'];

function SidebarFilters({ onFilterChange }) {
  const [price, setPrice] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('');
  const [inStock, setInStock] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  const handleCategoryToggle = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const applyFilters = () => {
    onFilterChange({
      price,
      sortBy,
      inStock,
      selectedCategories,
      selectedRating,
    });
  };

  return (
    <div className="w-full md:w-64 p-4 bg-white shadow rounded-lg space-y-6">
      <h2 className="text-lg font-bold mb-2">Filters</h2>

      {/* Price Slider */}
      <div>
        <p className="font-semibold mb-1">Price Range</p>
        <PriceRangeSlider
          min={0}
          max={1000}
          value={price}
          onChange={setPrice}
        />
      </div>

      {/* Sort By */}
      <div>
        <p className="font-semibold mb-1">Sort By</p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border w-full rounded px-2 py-1"
        >
          <option value="">Select</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="rating">Rating</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* In Stock */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="inStock"
          checked={inStock}
          onChange={() => setInStock(!inStock)}
          className="mr-2"
        />
        <label htmlFor="inStock" className="font-medium">In Stock Only</label>
      </div>

      {/* Categories */}
      <div>
        <p className="font-semibold mb-1">Categories</p>
        <div className="space-y-1">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center">
              <input
                type="checkbox"
                id={cat}
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryToggle(cat)}
                className="mr-2"
              />
              <label htmlFor={cat}>{cat}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Ratings */}
      <div>
        <p className="font-semibold mb-1">Minimum Rating</p>
        <StarRatingFilter
          selected={selectedRating}
          onChange={setSelectedRating}
        />
      </div>

      {/* Apply Filters */}
      <button
        onClick={applyFilters}
        className="bg-[#d58a94] text-white w-full py-2 rounded hover:bg-[#c27781] transition"
      >
        Apply Filters
      </button>
    </div>
  );
}

export default SidebarFilters;
