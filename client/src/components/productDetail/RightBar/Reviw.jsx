import React, { useState } from "react";

const Review = ({ defaultRating = 0 }) => {
  const [userRating, setUserRating] = useState(defaultRating);
  const [hover, setHover] = useState(0);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Star Inputs */}
        {[1, 2, 3, 4, 5].map((star) => (
          <label
            key={star}
            style={{ cursor: "pointer", fontSize: "28px", color: "#ffd700" }}
          >
            <input
              type="radio"
              name="userRating"
              value={star}
              style={{ display: "none" }}
              onClick={() => setUserRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            />
            <span>{hover >= star || userRating >= star ? "★" : "☆"}</span>
          </label>
        ))}

        {/* Display rating based on user selection */}
        <span
          style={{
            marginLeft: "12px",
            color: "#333",
            fontWeight: "bold",
            fontSize: "16px",
            userSelect: "none",
          }}
        >
          {userRating.toFixed(1)}
        </span>
      </div>
    </div>
  );
};

export default Review;
