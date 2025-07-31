const express = require("express");
const router = express.Router();
const {isClient} = require("../midllwear")

const {
  addReview,
  getReviewsByProduct,
  updateReview,
} = require("../controller/Review.controller");



// Add a review
router.post("/add", isClient, addReview);

// Get reviews for a product
router.get("/product/:productId", getReviewsByProduct);

// Update a review by review ID
router.put("/update/:id", isClient, updateReview);


module.exports = router;
