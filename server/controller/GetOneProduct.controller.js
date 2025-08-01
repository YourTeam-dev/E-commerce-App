const {Product} = require("../model");

const getOneProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate({
        path:"sellerId",
        select:"userId ",
        populate: { path: "userId", select: "name email _id"  }  
      })
      .populate([{
        path: "commentId",
        select:"commentText userId",
        populate: { path: "userId", select: "_id name email" }  
      }])
      

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getOneProductById };