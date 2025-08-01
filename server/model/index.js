const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

console.log('Mongo URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(' MongoDB connection error:', err));

module.exports = {
  User: require("./user.model"),

  Historic: require("./Historic.model"),


  Product: require("./Product.model"),
  Review: require("./Review.model"),
  Comment: require("./Comment.model"),

  Category: require("./Category.model"),

  Seller: require("./seller.model"),

  Order: require("./Order.model"),
  Hero: require("./Hero.model")
  }
