import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
const NavBar = () => {
  const [showCategory, setShowCategory] = useState(false);
  return (
    <div className="sticky top-0 z-50">
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

    </div>
  );
};

export default NavBar;
