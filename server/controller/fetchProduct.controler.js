const Category = require("../model/Category.model");
const Product = require("../model/Product.model");

const getProductByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const verifCategory = await Category.findById(id);
    if (!verifCategory)
      return res.status(404).json({ error: "Category not found "+id });
    const products = await Product.find({ categoryId: id });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
const getFiltredProduct = async (req, res) => {
  try {
    const {
      minPrice = 0,
      maxPrice,
      sortByCreatedAt = 1,
      sortByPrice,
      sortByQuantity,
      sortByRating,
      search,
      category,
      adress,
      inStock,
      promo,
      color,
      size,
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
      const cat = await Category.findOne({ title: category }).lean();
      FiltredQuery.categoryId = cat._id;
    }
    if (maxPrice) {
      FiltredQuery.price = { $gte: minPrice, $lte: maxPrice };
    }
    if (inStock)
      if (inStock === "true") FiltredQuery.quantity = { $gte: 1 };
      else FiltredQuery.quantity = { $lte: 0 };
    if (promo)
      if (promo === "true") FiltredQuery.promo = { $gte: 1 };
      else FiltredQuery.promo = { $lte: 0 };
    if (color) FiltredQuery.color = color;
    if (size) FiltredQuery.size = size;
    if (adress) FiltredQuery.adress = adress;

    const sortOptions = {};
    if (sortByCreatedAt) sortOptions.createdAt = Number(sortByCreatedAt);
    if (sortByPrice) sortOptions.price = Number(sortByPrice);
    if (sortByQuantity) sortOptions.quantity = Number(sortByQuantity);
    if (sortByRating) sortOptions.rating = Number(sortByRating);
    const products = await Product.find(FiltredQuery)
      .sort(sortOptions)
      .skip((page - 1) * 25)
      .limit(25);

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
const getHeroProduct = async(req,res)=> {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(5);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

module.exports = { getProductByCategory, getFiltredProduct };