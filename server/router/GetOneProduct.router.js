const express = require("express");
const router = express.Router();
const { getOneProductById } = require("../controller/GetOneProduct.controller");

// GET /api/products/:id
router.get("/:id", getOneProductById);

module.exports = router;
