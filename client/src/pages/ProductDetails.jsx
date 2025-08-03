import React, { useEffect, useState } from "react";
import Comment from "../components/productDetail/comment";
import ImageContainer from "../components/productDetail/ImageContainer";
import RightBar from "../components/productDetail/RightBar";
import { getProductById } from "../API/HandleProductDetail";
import { Loader } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  const navigate = useNavigate();

  const location = useLocation();
  const productId = location.state?.productId;

  if (!productId) navigate("/");

  useEffect(() => {
    getProductById(productId)
      .then((res) => setProduct(res))
      .catch(() => navigate("/"));
  }, [productId]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="flex flex-col md:flex-row mx-4">
        <ImageContainer images={product.images} />
        <RightBar product={product} />
      </div>
      <div className="bg-white p-4 mt-8 mx-4 mb-5" >
        <div className="flex border-b">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "description"
                ? "border-b-2 border-[#d58a94] text-[#d58a94]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`ml-4 px-4 py-2 text-sm font-medium ${
              activeTab === "comments"
                ? "border-b-2 border-[#d58a94] text-[#d58a94]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("comments")}
          >
            Comments
          </button>
        </div>

        <div className="mt-4">
          {activeTab === "description" && (
            <div className="text-gray-800">
              <p style={{ fontFamily: '"Times New Roman", Times, serif' }}>{product.description}</p>
            </div>
          )}
          {activeTab === "comments" && (
            <div className="text-gray-800">
              <Comment productId={product._id} listeComments={product.commentId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
