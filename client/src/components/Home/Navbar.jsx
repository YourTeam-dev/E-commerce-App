import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getAllCategories } from "../../API/Category";
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const [categories, setCatergories] = useState("");
  useEffect(() => {
    getAllCategories().then((res) => setCatergories(res));
  }, []);
  const [showCategory, setShowCategory] = useState(false);
  return (
    <div className="sticky top-0 z-50 mb-4 ">

      <nav className="bg-white shadow-md py-3 px-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-[#d58a94]">9achech</div>

        <div className="flex space-x-6 ml-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-[#d58a94] transition">
            Home
          </a>
          <a onClick={() => setShowCategory(!showCategory)} className="hover:text-[#d58a94] transition flex flex-col">
            <span>Categories</span>
            <span className="flex justify-center items-center">
              {showCategory ? (
                <ChevronUp />
              ) : (
                <ChevronDown/>
              )}
            </span>
          </a>
          <a href="#" className="hover:text-[#d58a94] transition">
            Deals
          </a>
        </div>

        <div className="flex-grow px-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d58a94]"
          />
        </div>

        <div>
          <button className="bg-[#d58a94] text-white px-5 py-2 rounded-full hover:bg-[#c27781] transition">
            Login
          </button>
        </div>
      </nav>

      {showCategory && (
        <div className="absolute top-[105%] left-0 w-full bg-white shadow-md py-1 border-t border-gray-200 px-6 flex items-center justify-between">
          <div className="flex-grow px-6">
            <ul className="flex flex-wrap">
              {categories.map((category) => (
                <li key={category.id} className="text-center w-1/6  hover:border-l hover:border-r border-[#d58a94]">
                  <a
                    onClick={() =>{setShowCategory(false); navigate(`/liste-prodcuts/`, { state: { category: category._id } })}}
                    className="text-gray-700 hover:text-[#d58a94] transition"
                  >
                    {category.title}
                  </a>
                </li>
              ))}
            </ul>

          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
