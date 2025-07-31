const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
    title: { type: String, require: true },
    subtitle: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hero", heroSchema);
