const mongoose = require("mongoose")

const productInOrderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true },
  status: { type: String, default: "pending" }
})

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    listeProduct: [productInOrderSchema],
    totalPrice: { type: Number, required: true },
    aproveIt: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Order", orderSchema)
