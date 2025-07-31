const router = require("express").Router();
const {
  getFiltredProduct,
  getProductByCategory,
  FeaturedProduct
} = require("../controller/fetchProduct.controler");

router.get("/getFiltredProduct", getFiltredProduct);
router.get("/getProductByCategory/:id", getProductByCategory);
router.get("/FeaturedProduct", FeaturedProduct);

module.exports = router;
