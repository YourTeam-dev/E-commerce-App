import React, { use, useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  LogOut,
  ShoppingCart,
  User,
} from "lucide-react";
import { getAllCategories } from "../../API/Category";
import { useNavigate } from "react-router-dom";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import useCart from "../../hooks/useCart";
import Search from "./Search";
import useAuth from "../../hooks/useAuth";
import ListeCategory from "./NavBar/ListeCategory";
import { getProfileApi } from "../../API/Auth";

const NavBar = () => {
  const { isAuthenticated, logout, token } = useAuth();
  const { cartProduct } = useCart();

  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();
  const [categories, setCatergories] = useState("");
  useEffect(() => {
    getProfileApi().then((res) => setProfile(res));
    console.log(profile);
  }, []);
  useEffect(() => {
    getAllCategories().then((res) => setCatergories(res));
  }, []);

  const [showCategory, setShowCategory] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("login");
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="sticky top-0 z-50  ">
      <nav className="bg-white shadow-md py-3 px-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-[#d58a94]">9achech</div>
        <div className="flex space-x-6 ml-8 text-gray-700 font-medium">
          <a
            onClick={() => navigate("/")}
            className="hover:text-[#d58a94] transition cursor-pointer"
          >
            Home
          </a>
          <a
            onClick={() => setShowCategory(!showCategory)}
            className=" flex flex-row hover:text-[#d58a94] transition cursor-pointer"
          >
            <span>Categories</span>
            <span className="flex justify-center items-center">
              {showCategory ? <ChevronUp /> : <ChevronDown />}
            </span>
          </a>
        </div>
        <Search />
        <div onClick={() => navigate("/cart")} className="relative">
          <span className="absolute top-0 right-0 w-4 h-4 z-10 bg-red-500 rounded-full text-white text-xs flex justify-center items-center">
            {cartProduct.length}
          </span>
          <ShoppingCart className="sticky top-4 right-4 w-8 h-8  text-[#d58a94] hover:text-[#d58a94] transition" />
        </div>
        {isAuthenticated ? (
          <div
            onClick={() => setShowProfileDropDown(!showProfileDropDown)}
            className="flex  items-center text-xs hover:border-b hover:text-[#d58a94] transition cursor-pointer"
          >
            Welcome {profile ? profile.name : ''}
            {!showProfileDropDown ? <ChevronDown /> : <ChevronUp />}
          </div>
        ) : (
          <button
            onClick={() => {
              setPopupType("login");
              setShowPopup(true);
            }}
            className="bg-[#d58a94] text-white px-5 py-2 rounded-full hover:bg-[#c27781] transition"
          >
            Login
          </button>
        )}
      </nav>
      {showProfileDropDown && (
        <div className="absolute right-6 mt-2 w-40 bg-white text-gray-800 rounded-md shadow-lg z-20">
          <button
            onClick={() => {
              navigate("/profile");
              setShowProfileDropDown(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
          >
            <User />
            <span>Profil</span>
          </button>
          <button
            onClick={() => {
              logout();
              setShowProfileDropDown(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
          >
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      )}
      {showCategory && (
        <ListeCategory
          categories={categories}
          setShowCategory={setShowCategory}
        />
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
              <Login closePopup={closePopup} />
            ) : (
              <Signup closePopup={closePopup} />
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
