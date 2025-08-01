import React, { useState } from "react";

const Color = ({ colors = ["#000000", "#ffffff", "#d58a94", "#f5b041", "#6a87c7"] }) => {
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <div>
      <label style={{ fontSize: "16px" }}>Color</label>
      <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
        {colors.map((color, index) => (
          <div
            key={index}
            onClick={() => setSelectedColor(color)}
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: color,
              border: selectedColor === color ? "2px solid #c9ad6a" : "1px solid #ccc",
              cursor: "pointer",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Color;
