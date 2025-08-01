import React from "react";
import Reviw from "./RightBar/Reviw";
import Size from "./RightBar/Size";
import Color from "./RightBar/Color";
import Quantity from "./RightBar/Quantity";
import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";
import Review from "./RightBar/Reviw";

const RightBar = ({ product }) => {
  return (
    <div className="w-[40%] p-5 bg-white rounded-[10px] flex flex-col gap-5 shadow-[0_0_10px_rgba(0,0,0,0.2)]  ml-10 mb-5">
      <div>
        <h2 className="text-[24px] ">{product.title}</h2>

        <div className="text-[24px] mt-2 mb-2">
          <span className="text-[#d32f2f] line-through">${product.price.toFixed(2)}</span>
          <span className="text-[#6200ea] ml-2">${(product.price -product.price * (product.promo/100)).toFixed(2)}</span>
          <span className="bg-[#6200ea] text-white px-2 py-1 rounded ml-2 text-sm">
           {product.promo}% OFF
          </span>
        </div>
      </div>

      <Review productId={product._id} defaultRating={product.rating} numberOfReviews={product.reviewId.length} />
      <Color colors={product.color} />
      <Size sizes={product.size} />
      <Quantity max={product.quantity} />

      <button className="bg-[#d58a94] text-white py-2 px-4 rounded cursor-pointer text-[16px]">
        Add to Cart
      </button>

      <div className="text-sm text-[#4caf50] flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Truck size={16} />
          <span>Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw size={16} />
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} />
          <span>2-year warranty included</span>
        </div>
        <div className="flex items-center gap-2">
          <Headphones size={16} />
          <span>24/7 customer support</span>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
