const express = require("express");
const router = express.Router();

const {
  updateReview,
} = require("../controller/Review.controller");
const { isAuth } = require("../midllwear");


router.put("/:id", updateReview);


module.exports = router;
