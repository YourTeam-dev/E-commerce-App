const router = require("express").Router();
const {
  getFiltredProduct,
  getProductByCategory,
  FeaturedProduct,
  ValidateProduct,
  getInvalidatedProducts,
  deleteProduct
} = require("../controller/fetchProduct.controler");
const { isAdmin } = require("../midllwear");

router.get("/getFiltredProduct", getFiltredProduct);
router.get("/getProductByCategory/:id", getProductByCategory);
router.get("/FeaturedProduct", FeaturedProduct);
router.put("/ValidateProduct/:id", isAdmin, ValidateProduct);
router.get("/getInvalidatedProducts", isAdmin, getInvalidatedProducts);
router.delete("/deleteProduct/:id", isAdmin, deleteProduct);

module.exports = router;