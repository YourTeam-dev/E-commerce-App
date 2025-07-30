const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
    commentId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    reviewId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],

    title: { type: String },
    description: { type: String, default: null },
    color: { type: String, default: null },
    size: { type: String, default: null },
    images: [{ type: String, default: null }],
    price: { type: Number, default: null },
    promo: { type: Number, default: null },
    quantity: { type: Number, default: null },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
