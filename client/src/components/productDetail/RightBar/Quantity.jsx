import React, { useState } from "react";

const Quantity = ({ max = 10 }) => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((prev) => (prev < max ? prev + 1 : prev));
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div>
      <label style={{ fontSize: "16px" }}>Quantity</label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "5px",
        }}
      >
        <button
          onClick={decrease}
          style={{
            padding: "5px 10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={increase}
          style={{
            padding: "5px 10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Quantity;
