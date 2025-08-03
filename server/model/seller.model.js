const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {

    adress: { type: String },
    phoneNumber: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Seller", sellerSchema);
