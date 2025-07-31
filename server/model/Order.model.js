const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    listeProduct: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, require: true },
    aproveIt: { type: Boolean, defaul: false },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Order", orderSchema);
