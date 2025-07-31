const router = require("express").Router();
const {
  getFiltredProduct,
  getProductByCategory,
} = require("../controller/fetchProduct.controler");

router.get("/getFiltredProduct", getFiltredProduct);
router.get("/getProductByCategory/:id", getProductByCategory);

module.exports = router;
