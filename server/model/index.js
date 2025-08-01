const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(' MongoDB connection error:', err));
  module.export={
    User:require("./user.model"),

    Historic:require("./Historic.model"),
    

    Product:require("./Product.model"),
    Review:require("./Review.model"),
    Comment:require("./Comment.model"),
    
    Categegory:require("./Category.model"),

    Seller:require("./seller.model"),

    Order:require("./Order.model"),

  }
