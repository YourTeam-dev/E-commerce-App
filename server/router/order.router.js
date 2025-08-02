const express = require ('express')
const router = express.Router()
const orderController = require('../controller/order.controller')
router.get('/user/:userId', orderController.getUserLatestOrder)
router.post('/',orderController.addOrder)
router.delete('/:id',orderController.deleteOrder)
router.put('/:id/validate',orderController.validateOrder)

module.exports = router