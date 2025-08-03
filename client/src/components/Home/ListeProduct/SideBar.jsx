import React, { useState } from "react";
import PriceRangeSlider from "./filters/PriceRange";
import StarRatingFilter from "./filters/RatingRange";
import ListeCategory from "./filters/ListeCategory";

function SidebarFilters({ onFilterChange, filtred }) {
  const [price, setPrice] = useState([0, 500]);
  const [sortBy, setSortBy] = useState();
  const [inStock, setInStock] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

  const applyFilters = () => {
    const sort = {};
    switch (sortBy) {
      case "priceLow":
        sort.sortByPrice = 1;
        break;
      case "priceHigh":
        sort.sortByPrice = -1;
        break;
      case "rating":
        sort.sortByRating = -1;
        break;
      case "oldest":
        sort.sortByCreatedAt = 1;
        break;
      case "newest":
        sort.sortByCreatedAt = -1;
        break;
      default:
        sort.sortByCreatedAt = 1;
        break;
    } 

    onFilterChange({
      minPrice: price[0],
      maxPrice: price[1],
      ...sort,
      inStock,
      category: selectedCategoryId,
      rating: selectedRating,
    });
  };

  return (
    <div className="w-full md:w-64 p-4 bg-white shadow rounded-lg space-y-6">
      <h2 className="text-lg font-bold mb-2">Filters</h2>

      <div>
        <p className="font-semibold mb-1">Price Range</p>
        <PriceRangeSlider
          min={0}
          max={1000}
          value={price}
          onChange={setPrice}
        />
      </div>

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
          <option value="oldest ">Oldest</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="inStock"
          checked={inStock}
          onChange={() => setInStock(!inStock)}
          className="mr-2"
        />
        <label htmlFor="inStock" className="font-medium">
          In Stock Only
        </label>
      </div>

      <ListeCategory
        selectedCategoryId={filtred.category}
        selectedCategory={(cat) => setSelectedCategoryId(cat._id)}
      />

      <div>
        <p className="font-semibold mb-1">Minimum Rating</p>
        <StarRatingFilter
          selected={selectedRating}
          onChange={setSelectedRating}
        />
      </div>

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
