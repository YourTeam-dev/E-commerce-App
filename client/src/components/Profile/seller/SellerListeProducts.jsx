import React, { useEffect, useState } from "react";
import { deleteProduct, fetchProducts } from "../../../API/SellerCrud";
import { Loader } from "lucide-react";
import UpdateProductModal from "./UpdateProductModal";
import AddProductModal from "./AddProductModal";
function SellerListeProducts() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
    console.log("products:", products);
  }, []);

  if (loading) {
    return (
      <Loader className="justify-center   w-10 h-10 animate-spin text-blue-500 mx-auto mt-20" />
    );
  }
  const handleDelete = (productId) => {
    setDeleteLoading(true);
    deleteProduct(productId)
      .then(() => {
        setProducts((prev) => prev.filter((p) => p._id !== productId));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };

  return (
    <>
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">📦 My Products</h2>
          <button
            className="bg-[#d58a94] text-white px-4 py-2 rounded mb-4 hover:bg-[#d58a94]/80"
            onClick={() => setShowAddProduct(true)}
          >
            Add Product
          </button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Title</th>
              <th className="p-2">Price</th>
              <th className="p-2">Promo</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t relative">

                <td className="p-2">{p.title}</td>
                <td className="p-2">${p.price}</td>
                <td className="p-2">{p.promo}%</td>
                <td className="p-2">{p.quantity}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      p.quantity > 0 ? p.validated ? "bg-green-500" : "bg-yellow-500" : "bg-red-500"
                    }`}
                  >
                    {p.quantity > 0 ? p.validated ? "Valid" : "Pending" : "Out of Stock"}
                  </span>
                </td>
                <td className="p-2 space-x-3">
                  <button onClick={() => {
                    setSelectedProduct(p);
                    setShowUpdateProduct(true);
                  }} className="text-yellow-600 hover:underline ">
                    Update
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:underline">
                    {deleteLoading ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      "Delete"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showUpdateProduct && (
        <UpdateProductModal  onClose={() => setShowUpdateProduct(false)} />
      )}
      {showAddProduct && (
        <AddProductModal onClose={() => setShowAddProduct(false)} />
      )}
    </>
  );
}

export default SellerListeProducts;
