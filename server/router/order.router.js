const express = require("express")
const router = express.Router()
const orderController = require("../controller/order.controller")

router.get("/", orderController.getAllOrders)
router.get("/user/:userId/latest", orderController.getUserLatestOrder)
router.post("/", orderController.addOrder)
router.delete("/:id", orderController.deleteOrder)

router.patch("/:orderId/products/:productId/validate", orderController.validateProductInOrder)
router.delete("/:orderId/products/:productId/reject", orderController.rejectProductInOrder)

module.exports = router
