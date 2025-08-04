const express = require('express');
const router = express.Router();
const controller = require('../controller/sellerProductController');
const { isSeller } = require('../midllwear');
const upload = require("../images/multer.config");

router.get('/products', isSeller, controller.getProductsBySeller);

router.post('/products', isSeller, upload.array("images",10), controller.addProductBySeller);

router.put('/products/:productId', isSeller, upload.array("images",10), controller.updateProductBySeller);

router.delete('/products/:productId', isSeller, controller.deleteProductBySeller);

module.exports = router;
