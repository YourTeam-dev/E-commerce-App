const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: {type: Boolean, default: false},
  isSeller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
  histoiqueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Historique' },
  commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' }

});

module.exports = mongoose.model('User', userSchema);