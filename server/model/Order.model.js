const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
<<<<<<< HEAD
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    listeProduct: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, require: true },
    aproveIt: { type: Boolean, defaul: false },
=======
    userId :{type : mongoose.Schema.Types.ObjectId,ref: "User"},
    listeProduct:[
      { 
    productId :{type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity :{type : Number, required : true}
    }
  ],
    totalPrice: { type: Number, require:true },
    aproveIt:{ type: Boolean, default:false },
>>>>>>> 14d56c4124a952d0317cadaef39efbfd99fbf999
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Order", orderSchema);
