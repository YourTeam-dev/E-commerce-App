const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    review:{ type: Number, defaul:0 }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
