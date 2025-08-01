const express = require('express');
const router = express.Router();
const controller = require('../controller/sellerProductController');

router.get('/:sellerId/products', controller.getProductsBySeller);

router.post('/:sellerId/products', controller.addProductBySeller);

router.put('/:sellerId/products/:productId', controller.updateProductBySeller);

router.delete('/:sellerId/products/:productId', controller.deleteProductBySeller);

module.exports = router;
