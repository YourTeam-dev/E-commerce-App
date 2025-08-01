const router = require("express").Router();
const {isAdmin} = require("../midllwear");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryPath,
  getFeaturedCategories
} = require("../controller/category.controler");

router.post("/addCategory",isAdmin, createCategory);
router.put("/updateCategory/:id", isAdmin, updateCategory);
router.delete("/deleteCategory/:id", isAdmin, deleteCategory);
router.get("/getAllCategories", getAllCategories);
router.get("/getCategoryPath/:id", getCategoryPath);
router.get("/getFeaturedCategories", getFeaturedCategories);
module.exports = router;
