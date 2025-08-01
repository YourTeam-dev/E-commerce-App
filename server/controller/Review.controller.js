const Review = require("../model/Review.model");
const Product = require("../model/Product.model");

const updateRating = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) return;

  const reviews = await Review.find({ productId });
  if (reviews.length === 0) {
    product.rating = 0;
  } else {
    const totalRating = reviews.reduce((sum, r) => sum + r.review, 0);
    product.rating = totalRating / reviews.length;
  }
  await product.save();
};


const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { review } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { review },
      { upsert: true, new: true }
    );
    if (!updatedReview)
      return res.status(404).json({ message: "Review not found" });

    await updateRating(updatedReview.productId);

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ "Error updating review:": error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview)
      return res.status(404).json({ message: "Review not found" });

    await updateRating(deletedReview.productId);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateReview,
  deleteReview,
};
