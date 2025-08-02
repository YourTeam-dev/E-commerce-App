import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";
import { getAllCategories } from "../../API/Category";
import { useNavigate } from "react-router-dom";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import useCart from "../../hooks/useCart";
import Search from "./Search";

const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const [categories, setCatergories] = useState("");
  const { cartProduct } = useCart()
  useEffect(() => {
    getAllCategories().then((res) => setCatergories(res));
  }, []);
  const [showCategory, setShowCategory] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("login");

  const closePopup = () => {
    setShowPopup(false);
  };

  const switchPopup = (type) => {
    setPopupType(type);
  };

  return (
    <div className="sticky top-0 z-50  ">
      <nav className="bg-white shadow-md py-3 px-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-[#d58a94]">9achech</div>

        <div className="flex space-x-6 ml-8 text-gray-700 font-medium">
          <a
            onClick={() => navigate("/")}
            className="hover:text-[#d58a94] transition"
          >
            Home
          </a>
          <a
            onClick={() => setShowCategory(!showCategory)}
            className="hover:text-[#d58a94] transition flex flex-col"
          >
            <span>Categories</span>
            <span className="flex justify-center items-center">
              {showCategory ? <ChevronUp /> : <ChevronDown />}
            </span>
          </a>

        </div>

      <Search />

        <div>
          <button
            onClick={() => {
              setPopupType("login");
              setShowPopup(true);
            }}
            className="bg-[#d58a94] text-white px-5 py-2 rounded-full hover:bg-[#c27781] transition"
          >
            Login
          </button>
        </div>
        <div onClick={()=> navigate('/cart')} className="relative">
          <span className="absolute top-0 right-0 w-4 h-4 z-10 bg-red-500 rounded-full text-white text-xs flex justify-center items-center">
            {cartProduct.length}
          </span>
          <ShoppingCart className="sticky top-4 right-4 w-8 h-8  text-[#d58a94] hover:text-[#d58a94] transition" />
        </div>
      </nav>

      {showCategory && (
        <div className="absolute top-[105%] left-0 w-full bg-white shadow-md py-1 border-t border-gray-200 px-6 flex items-center justify-between">
          <div className="flex-grow px-6">
            <ul className="flex flex-wrap">
              {categories.map((category) => (
                <li
                  key={category._id}
                  className="text-center w-1/6  hover:border-l hover:border-r border-[#d58a94]"
                >
                  <a
                    onClick={() => {
                      setShowCategory(false);
                      navigate(`/liste-products`, {
                        state: { category: category._id },
                      });
                    }}
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

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
              aria-label="Close popup"
            >
              &times;
            </button>
            {popupType === "login" ? (
              <Login setToken={setToken} />
            ) : (
              <Signup
                setToken={setToken}
                onSuccess={() => setPopupType("login")}
              />
            )}
            <div className="mt-4 text-center">
              {popupType === "login" ? (
                <p>
                  Don't have an account?{" "}
                  <button
                    onClick={() => {
                      setPopupType("signup");
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Signup here
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setPopupType("login");
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Login here
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
