const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    listeProduct:[{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    totalPrice: { type: Number, require:true },
    aproveIt:{ type: Boolean, defaul:false },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Order", orderSchema);
