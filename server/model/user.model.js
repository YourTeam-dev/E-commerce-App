const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:  { type: String, require: true },
  email: { type: String, unique: true },
  password: String,
  isAdmin: {type: Boolean, default: false},
  isSeller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller',  default: null },
},{
  timestamps: true
});

module.exports  = mongoose.models.User || mongoose.model("User", userSchema);

