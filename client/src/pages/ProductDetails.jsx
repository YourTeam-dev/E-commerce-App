import React, { useEffect, useState } from "react";
import Comment from "../components/productDetail/comment";
import ImageContainer from "../components/productDetail/ImageContainer";
import RightBar from "../components/productDetail/RightBar";
import { getProductById } from "../API/HandleProductDetail";
import { Loader } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
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
  console.log("Product Details:", product);


  return (
    <div className="bg-red-100 min-h-screen p-4">
      <div className="flex flex-col md:flex-row mx-4">
        <ImageContainer images={product.images} />
        <RightBar product={product} />
      </div>

      <Comment listeComments={product.commentId} />
    </div>
  );
};

export default ProductDetails;
