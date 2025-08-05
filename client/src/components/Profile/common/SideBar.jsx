import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ profile }) => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const isAdmin = profile?.isAdmin;
  const isSeller = !!profile?.isSeller;

  const navItems = isAdmin
    ? [
        { path: "admin/profile", label: "Profile Information" },
        { path: "admin/validate-products", label: "Validate Products" },
        { path: "admin/validate-orders", label: "Validate Orders" },
        { path: "admin/hero-management", label: "Hero Management" },
        { path: "admin/categories-management", label: "Categories Management" },
        { path: "admin/analytics", label: "Analytics" },
        { path: "admin/historics", label: "Historics" },
      ]
    : isSeller
    ? [
        { path: "seller/profile", label: "Profile Information" },
        { path: "seller/orders", label: "Orders" },
        { path: "seller/products", label: "Products" },
        { path: "seller/analytics", label: "Analytics" },
        { path: "admin/historics", label: "Historics" },

      ]
    : [
        { path: "client/profile", label: "Profile Information" },
        { path: "client/orders", label: "Order History" },
        { path: "client/historics", label: "Historics" },
      ];

  return (
    <aside className="w-64 m-3 bg-white shadow-xl rounded-lg h-fit p-4 border-r">
      <div className="flex flex-col items-center border-b border-[#d58a94] mb-2 pb-2">
        <div className="h-20 w-20 flex items-center justify-center rounded-full bg-[#d58a94] text-white">
          <span className="text-4xl font-bold">
            {profile?.name?.slice(0, 2).toUpperCase() || "AD"}
          </span>
        </div>
        <div className="mx-auto text-sm text-black text-center mt-2">
          <p className="font-bold text-lg">{profile?.name || "User"}</p>
          <p className="text-sm">{profile?.email || "user@example.com"}</p>
        </div>
      </div>

      <nav className="space-y-3">
        {navItems.map(({ path, label }) => (
          <div
          onClick={()=>navigate(path)}
            key={path}
            className={`block px-4 py-2 rounded-md transition-all duration-150 ${
              location.pathname === path
                ? "bg-[#d58a94] text-white"
                : "hover:bg-[#d58a94] hover:text-white"
            }`}
          >
            {label}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
