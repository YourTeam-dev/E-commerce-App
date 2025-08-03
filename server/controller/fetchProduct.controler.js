const Category = require("../model/Category.model");
const Product = require("../model/Product.model");
const Hero = require("../model/Hero.model");
const getProductByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const verifCategory = await Category.findById(id);
    if (!verifCategory)
      return res.status(404).send({ error: "Category not found " + id });
    const products = await Product.find({ categoryId: id });
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};
const getFiltredProduct = async (req, res) => {
  try {
    const {
      minPrice = 0,
      maxPrice,
      sortByCreatedAt = 1,
      sortByPrice,
      sortByRating,
      search,
      category,
      inStock,
      rating,
      page = 1,
    } = req.query;
    const FiltredQuery = {};

    if (search) {
      FiltredQuery.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    
    if (category) {
      const cat = await Category.findById(category).lean();
      FiltredQuery.categoryId = cat._id;
    }
    if (maxPrice) {
      FiltredQuery.price = { $gte: minPrice, $lte: maxPrice };
    }
    if (inStock)
      if (inStock === "true") FiltredQuery.quantity = { $gte: 1 };
      else FiltredQuery.quantity = { $lte: 0 };
    if (rating) FiltredQuery.rating = { $gte: rating };

    const sortOptions = {};
    if (sortByCreatedAt) sortOptions.createdAt = Number(sortByCreatedAt);
    if (sortByPrice) sortOptions.price = Number(sortByPrice);
    if (sortByRating) sortOptions.rating = Number(sortByRating);
    const products = await Product.find(FiltredQuery)
      .sort(sortOptions)
      .skip((page - 1) * 25)
      .limit(25);

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
const FeaturedProduct = async (req, res) => {
  try {
    const products = await Product.find().sort({ rating: -1 })
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

module.exports = { getProductByCategory, getFiltredProduct, FeaturedProduct };
