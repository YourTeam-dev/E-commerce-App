import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navItems = [
    { path: "/seller/dashboard", label: "Dashboard" },
    { path: "/seller/add", label: "Add Product" },
    { path: "/seller/products", label: "My Products" },
    { path: "/seller/history", label: "Historic" },
  ];

  return (
    <aside className="w-64 m-3 bg-white shadow-xl rounded-lg h-96 p-4 border-r">
        <div className="flex flex-col items-center border-b border-[#d58a94] mb-2 pb-2">
          <div className=" items-center h-20 w-20 px-4 py-4 rounded-full bg-[#d58a94] text-white ">
            <span className="text-4xl font-bold">SE</span>
          </div>
          <div className=" mx-auto text-sm text-black text-center">
            <p className="font-bold text-lg">SELLER</p>
            <p className="text-sm">seller@gmail.com</p>
          </div>
        </div>
      <nav className="space-y-3">
        {navItems.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`block px-4 py-2 rounded-md transition-all duration-150 ${
              location.pathname === path
                ? "bg-[#d58a94] text-white"
                : "hover:bg-[#d58a94] hover:text-white"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
