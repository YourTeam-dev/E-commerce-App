import React, { useEffect, useState } from "react";

//Import Common Components
import ProfileDetails from "../components/Profile/common/ProfileDetails";
import History from "../components/Profile/common/History";
import Sidebar from "../components/Profile/common/SideBar";

// Import Admin Components
import AdminAnalytic from "../components/Profile/admin/AdminAnalytic";
import AdminValidOrders from "../components/Profile/admin/AdminValidOrders";
import AdminValidProducts from "../components/Profile/admin/AdminValidProducts";

// Import Seller Components
import SellerAnalytics from "../components/Profile/seller/SellerAnalytics";
import SellerOrders from "../components/Profile/seller/SellerOrders";
import SellerListeProducts from "../components/Profile/seller/SellerListeProducts";
import SellerAddProduct from "../components/Profile/seller/SellerAddProduct";
// Import Client Components
import ClientOrders from "../components/Profile/client/ClientOrders";

import useAuth from "../hooks/useAuth";
import { getProfileApi } from "../API/Auth";
import { Loader } from "lucide-react";
import { Route, Routes, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) navigate("/");

  useEffect(() => {
    getProfileApi()
      .then((res) => {
        setProfile(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate("/");
        return;
      });
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar profile={profile} />
    <div className="bg-white mx-auto h-full p-12 rounded-lg w-9/12 shadow my-3">
      <Routes>
        {/* Admin Routes */}
        <Route
          path="admin/profile"
          element={<ProfileDetails profile={profile} />}
        />
        <Route
          path="admin/validate-products"
          element={<AdminValidProducts profile={profile} />}
          profile={profile}
        />
        <Route
          path="admin/validate-orders"
          element={<AdminValidOrders profile={profile} />}
        />
        <Route
          path="admin/analytics"
          element={<AdminAnalytic profile={profile} />}
        />
        <Route
          path="admin/historics"
          element={<History profile={profile} />}
        />

        {/* Seller Routes */}
        <Route
          path="seller/profile"
          element={<ProfileDetails profile={profile} />}
        />

        <Route
          path="seller/orders"
          element={<SellerOrders profile={profile} />}
        />
        <Route
          path="seller/products"
          element={<SellerListeProducts profile={profile} />}
        />
        <Route
          path="/seller/add-product"
          element={<SellerAddProduct profile={profile} />}
        />
        <Route
          path="seller/analytics"
          element={<SellerAnalytics profile={profile} />}
        />
        <Route
          path="admin/historics"
          element={<History profile={profile} />}
        />

        {/* Client Routes */}
        <Route
          path="client/profile"
          element={<ProfileDetails profile={profile} />}
        />
        <Route
          path="client/orders"
          element={<ClientOrders profile={profile} />}
        />
        <Route
          path="/admin/historics"
          element={<History profile={profile} />}
        />
      </Routes>
      </div>
    </div>
  );
}

export default Profile;
