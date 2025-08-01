const express = require("express");
const router = express.Router();
const {isClient} = require("../midllwear")

const {
  addReview,
  updateReview,
} = require("../controller/Review.controller");



// Add a review
router.post("/add", isClient, addReview);

// Get reviews for a product

// Update a review by review ID
router.put("/update/:id", isClient, updateReview);


module.exports = router;
