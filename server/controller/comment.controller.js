const Comment = require("../model/Comment.model");

const addComment = async (req, res) => {
  try {
    const { productId, userId, commentText } = req.body;

    if (!productId || !userId || !commentText) {
      return res.status(400).send({ error: "All fields are required" });
    }

 await Comment.create({
      productId,
      userId,
      commentText,
    });

    res.status(201).send({message:"comment added successfully"});
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  addComment,
};
