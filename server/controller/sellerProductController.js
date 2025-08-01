const Product = require('../model/Product.model');
module.exports={
// Get all products for one seller
getProductsBySeller : async function (req, res) {
  try {
    const { sellerId } = req.params;
    const products = await Product.find({ sellerId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},

// Add product for one seller
addProductBySeller : async function (req, res) {
  try {
    const { sellerId } = req.params;
    const { title, description, color, size,images,price,promo,quantity,rating } = req.body;

    const newProduct = new Product({
      title,
      description,
      color,
      size,
      images,
      price,
      promo,
      quantity,
      rating,
      sellerId
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
},

// Update a seller's product
updateProductBySeller : async function (req, res) {
  try {
    const { sellerId, productId } = req.params;
    const product = await Product.findOne({ id: productId, sellerId });

    if (!product) return res.status(404).json({ message: 'Product not found or not yours' });

    const updated = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},

//Delete a seller's product
deleteProductBySeller : async function(req, res) {
  try {
    const { sellerId, productId } = req.params;
    const product = await Product.findOne({ id: productId, sellerId });

    if (!product) return res.status(404).json({ message: 'Product not found or not yours' });

    await Product.findByIdAndDelete(productId);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},
}
