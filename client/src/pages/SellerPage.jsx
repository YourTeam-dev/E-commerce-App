import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/SellerProfil/SideBar";
import AddProductForm from "../components/SellerProfil/AddProduct";
import ProductTable from "../components/SellerProfil/ProductTable";
import UserOverview from "../components/SellerProfil/UserProfile";
import Historic from "../components/SellerProfil/SellerHistoric";

const SellerDashboard = () => {
  const products = [];

  return (
    <div className="flex bg-gray-100 h-screen">
      <Sidebar />

      <main className="flex-1 overflow-auto m-6 rounded-lg bg-white shadow-lg ">
        <Routes>
          <Route path="dashboard" element={<UserOverview />} />
          <Route path="add" element={<AddProductForm />} />
          <Route
            path="products"
            element={<ProductTable products={products} />}
          />
          <Route path="history" element={<Historic />} />
        </Routes>
      </main>
    </div>
  );
};

export default SellerDashboard;
