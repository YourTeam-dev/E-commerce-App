const Product = require("../model/Product.model");
module.exports = {
  getProductsBySeller: async function (req, res) {
    try {
      const sellerId  = req.user.isSeller;
      const products = await Product.find({ sellerId });
      res.send(products);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  },

  addProductBySeller: async function (req, res) {
    try {
      const sellerId = req.user.isSeller;
      const { title, description, price, promo, quantity, categoryId } = req.body;
      const color = Array.isArray(req.body.color)
        ? req.body.color
        : [req.body.color];
      const size = Array.isArray(req.body.size)
        ? req.body.size
        : [req.body.size];

      const images = req.files.map((file) => file.filename);
      const categoryIds = Array.isArray(categoryId)
        ? categoryId
        : [categoryId];
      const newProduct = await Product.create({
        title,
        description,
        price,
        promo,
        quantity,
        color,
        size,
        images,
        sellerId,
        categoryId: categoryIds,

      });
      res.status(201).send(newProduct);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  },

  updateProductBySeller: async function (req, res) {
    try {
      const sellerId = req.user.isSeller;
      const { productId } = req.params;
      const { title, description, price, promo, quantity } = req.body;

      const color = Array.isArray(req.body.color)
        ? req.body.color
        : [req.body.color];
      const size = Array.isArray(req.body.size)
        ? req.body.size
        : [req.body.size];

      const images = req.files?.map((file) => file.filename) || [];

      const updated = await Product.findByIdAndUpdate(
        productId,
        {
          title,
          description,
          price,
          promo,
          quantity,
          color,
          size,
          ...(images.length > 0 && { images }),
        },
        { new: true }
      );

      res.send(updated);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  },

  deleteProductBySeller: async function (req, res) {
    try {
      const { productId } = req.params;
      await Product.findByIdAndDelete(productId);
      res.send({ message: "Product deleted" });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  },
};




