import React, { useState } from "react";
import { updateReviewCount } from "../../../API/HandleProductDetail";

const Review = ({ defaultRating = 0, numberOfReviews, productId }) => {
  const [userRating, setUserRating] = useState(defaultRating);
  const [hover, setHover] = useState(0);
  const handleRatingChange = (rating) => {
    setUserRating(rating);
    updateReviewCount(productId, rating);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
              onClick={() => handleRatingChange(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            />
            <span>{hover >= star || userRating >= star ? "★" : "☆"}</span>
          </label>
        ))}

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
        <span className="text-gray-500 text-sm">
          ({numberOfReviews} reviews)
        </span>
      </div>
    </div>
  );
};

export default Review;
