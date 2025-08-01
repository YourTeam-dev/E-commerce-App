import React, { useEffect, useState } from "react";
import Reviw from "./RightBar/Reviw";
import Size from "./RightBar/Size";
import Color from "./RightBar/Color";
import Quantity from "./RightBar/Quantity";
import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const RightBar = () => {
  return (
    <div
      style={{
        width: "40%",
        padding: "20px",
        background: "#fff",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        marginTop: "40px",
        marginLeft: "40px",
      }}
    >
      <div>
        <h2 style={{ margin: "0", fontSize: "24px" }}>
          Premium Wireless Headphones
        </h2>

        <div style={{ fontSize: "24px", margin: "10px 0" }}>
          <span style={{ color: "#d32f2f", textDecoration: "line-through" }}>
            $399.99
          </span>
          <span style={{ color: "#6200ea", marginLeft: "10px" }}>$299.99</span>
          <span
            style={{
              background: "#6200ea",
              color: "white",
              padding: "2px 8px",
              borderRadius: "5px",
              marginLeft: "10px",
            }}
          >
            25% OFF
          </span>
        </div>
      </div>

      <Reviw />
      <Color />
      <Size />
      <Quantity />

      <button
        style={{
          background: "#d58a94",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Add to Cart
      </button>
     

      <div
        style={{
          fontSize: "14px",
          color: "#4caf50",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Truck size={16} />
          <span>Free shipping on orders over $50</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <RotateCcw size={16} />
          <span>30-day return policy</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ShieldCheck size={16} />
          <span>2-year warranty included</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Headphones size={16} />
          <span>24/7 customer support</span>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
