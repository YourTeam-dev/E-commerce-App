import React, { useState } from "react";

const Size = ({ sizes = ["S", "M", "L", "XL"] }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <div>
      <label style={{ fontSize: "16px" }}>Size</label>
      <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
        {sizes.map((size, index) => (
          <button
            key={index}
            onClick={() => setSelectedSize(size)}
            style={{
              padding: "5px 12px",
              borderRadius: "5px",
              cursor: "pointer",
              border: selectedSize === size ? "2px solid #c9ad6a" : "1px solid #ccc",
              backgroundColor: selectedSize === size ? "#c9ad6a" : "white",
              fontWeight: selectedSize === size ? "bold" : "normal"
            }}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Size;
