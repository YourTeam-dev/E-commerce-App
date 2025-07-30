const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    adress:{ type: String, require:true },
    phoneNumber:{ type: Number, require:true },
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Seller", sellerSchema);
