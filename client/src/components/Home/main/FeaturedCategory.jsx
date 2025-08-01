import React, { useEffect, useState } from "react";
import { getFeaturedCategories } from "../../../API/Category";
import { useNavigate } from "react-router-dom";

function FeaturedCategory() {
  const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    useEffect(() => {
      getFeaturedCategories().then((res) => setCategory(res));
    }, []);
  return (
    <div className="w-full h-[500px] overflow-hidden my-5">
      <div className="flex flex-col items-center  w-full">
        <p className=" text-center text-3xl font-bold mb-4">Shop by Category</p>
        <p className="text-center text-sm  mb-6">
          Dicoverd amazing products across all categories
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 my-3">
        {category.map((cat, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl overflow-hidden transition-transform hover:scale-105 hover:shadow-lg hover:shadow-[#d58a94] cursor-pointer"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-black">{cat.title}</h3>
              <button onClick={() => navigate(`/liste-products`, { state: { category: cat._id } })} className="mt-2 bg-[#d58a94] hover:bg-[#c27781] text-white text-sm font-medium py-2 px-4 rounded-full">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedCategory;
