const express = require("express");
const router = express.Router();
const orderController = require("../controller/order.controller");
const { isSeller } = require("../midllwear");
router.get("/user/:userId", orderController.getUserLatestOrder);
router.post("/", orderController.addOrder);
router.delete("/:id", orderController.deleteOrder);
router.put("/:id/validate", orderController.validateOrder);
router.get(
  "/orders-specific-seller/",
  isSeller,
  orderController.getOrdersWithSellerProducts
);
module.exports = router;
